import express from 'express';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();
const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(bodyParser.json());

app.post('/faturas', async (req, res) => {
    const data = req.body;
    try {
        const fatura = await prisma.fatura.create({
            data: data,
        });
        res.json(fatura);
    } catch (error: unknown) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.get('/faturas', async (req, res) => {
    try {
        const faturas = await prisma.fatura.findMany();
        res.json(faturas);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.get('/faturas/:client_number', async (req, res) => {
    const client_number = req.params.client_number;
    try {
        const faturas = await prisma.fatura.findMany({
            where: {
                client_number: client_number,
            },
        });
        res.json(faturas);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.post('/download-pdf', async (req, res) => {
    const { installation_number, month, year } = req.body;

    if (!installation_number || !month || !year) {
        return res.status(400).json({ error: 'Installation number, month, and year are required' });
    }

    try {
        const data = await prisma.fatura.findMany({
            where: { installation_number },
        });

        if (data.length === 0) {
            return res.status(404).json({ error: 'No data found for the given installation number' });
        }

        const expectedFilename = `${installation_number}-${month}-${year}.pdf`;
        const pdfDirectory = path.join(__dirname, '..', 'pdf');
        const pdfPath = path.join(pdfDirectory, expectedFilename);

        if (!fs.existsSync(pdfPath)) {
            return res.status(404).json({ error: 'PDF file not found' });
        }

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${expectedFilename}`);
        fs.createReadStream(pdfPath).pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
