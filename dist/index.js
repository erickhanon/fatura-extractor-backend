"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:3001',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.post('/faturas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        const fatura = yield prisma.fatura.create({
            data: data,
        });
        res.json(fatura);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.get('/faturas', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const faturas = yield prisma.fatura.findMany();
        res.json(faturas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.get('/faturas/:client_number', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const client_number = req.params.client_number;
    try {
        const faturas = yield prisma.fatura.findMany({
            where: {
                client_number: client_number,
            },
        });
        res.json(faturas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
app.post('/download-pdf', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { installation_number, month, year } = req.body;
    if (!installation_number || !month || !year) {
        return res.status(400).json({ error: 'Installation number, month, and year are required' });
    }
    try {
        const data = yield prisma.fatura.findMany({
            where: { installation_number },
        });
        if (data.length === 0) {
            return res.status(404).json({ error: 'No data found for the given installation number' });
        }
        const expectedFilename = `${installation_number}-${month}-${year}.pdf`;
        const pdfDirectory = path_1.default.join(__dirname, '..', 'pdf');
        const pdfPath = path_1.default.join(pdfDirectory, expectedFilename);
        if (!fs_1.default.existsSync(pdfPath)) {
            return res.status(404).json({ error: 'PDF file not found' });
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${expectedFilename}`);
        fs_1.default.createReadStream(pdfPath).pipe(res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
