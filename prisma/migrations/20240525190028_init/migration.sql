-- CreateTable
CREATE TABLE "Fatura" (
    "id" SERIAL NOT NULL,
    "client_number" TEXT NOT NULL,
    "reference_month" TEXT NOT NULL,
    "energia_eletrica_kwh" INTEGER NOT NULL,
    "energia_eletrica_valor" DOUBLE PRECISION NOT NULL,
    "energia_scee_kwh" INTEGER NOT NULL,
    "energia_scee_valor" DOUBLE PRECISION NOT NULL,
    "energia_compensada_kwh" INTEGER NOT NULL,
    "energia_compensada_valor" DOUBLE PRECISION NOT NULL,
    "contrib_ilum_valor" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fatura_pkey" PRIMARY KEY ("id")
);
