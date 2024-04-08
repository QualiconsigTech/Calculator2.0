import { CalculadoraGeral } from "@/MathCalculator/GlobalCalculato";

export const InbursaDataSystem = (
  parcelaAtual: any,
  parcelaRestante: any,
  SaldoDevedor: any,
  parcelasPagas: any
) => {
  const taxas = [1.45, 1.54, 1.58, 1.68, 1.78];
  const InbursaCalc = new CalculadoraGeral(taxas);
  const pmt = InbursaCalc.calcularPMTComParcelasPagas(
    SaldoDevedor,
    parcelaRestante,
    parcelasPagas
  );

  return {
    nameBank: "Inbursa",
    taxas,
    pmt,
    parcelaAtual,
    parcelaRestante,
    SaldoDevedor,
  };
};

export const PagbankDataSystem = (
  parcelaAtual: any,
  parcelaRestante: any,
  SaldoDevedor: any,
  parcelasPagas: any
) => {
  const taxas = [1.45, 1.54, 1.58, 1.68, 1.78];
  const PagbankCalc = new CalculadoraGeral(taxas);
  const pmt = PagbankCalc.calcularPMTComParcelasPagas(
    SaldoDevedor,
    parcelaRestante,
    parcelasPagas
  );

  return {
    nameBank: "Pagbank",
    taxas,
    pmt,
    parcelaAtual,
    parcelaRestante,
    SaldoDevedor,
  };
};

export const C6DataSystem = (
  parcelaAtual: any,
  parcelaRestante: any,
  SaldoDevedor: any,
  parcelasPagas: any
) => {
  const taxas = [1.55, 1.60, 1.65, 1.70, 1.75];
  const C6Calc = new CalculadoraGeral(taxas);
  const pmt = C6Calc.calcularPMTComParcelasPagas(
    SaldoDevedor,
    parcelaRestante,
    parcelasPagas
  );

  return {
    nameBank: "C6",
    taxas,
    pmt,
    parcelaAtual,
    parcelaRestante,
    SaldoDevedor,
  };
};
