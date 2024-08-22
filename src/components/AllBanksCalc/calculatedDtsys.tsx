import { CalculadoraGeral } from "@/MathCalculator/GlobalCalculato";
import { NoCalculadoraGeral } from "@/MathCalculator/NoMargGlobalCalulator";

export const InbursaDataSystem = (
  parcelaAtual: any,
  parcelaRestante: any,
  SaldoDevedor: any,
  parcelasPagas: any
) => {
  const taxas = [1.34, 1.38, 1.42, 1.48, 1.52, 1.58, 1.64];
  const InbursaCalc = new CalculadoraGeral(taxas);
  const taxacalc = InbursaCalc.calcularTaxa(parcelaAtual,
    parcelaRestante,
    -SaldoDevedor,
    1e-6)

  const subParcela = parcelaRestante - parcelasPagas
  console.log(subParcela)
  const rate = taxacalc / 100
  
  const valorPresent = pv(rate, subParcela, -parcelaAtual)
  const valorPresenteFix = valorPresent.toFixed(2)

  const pmt = InbursaCalc.calcularPMTComParcelasPagas(
    valorPresenteFix,
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
    valorPresent,
    parcelasPagas
  };
};

export const PagbankDataSystem = (
  parcelaAtual: any,
  parcelaRestante: any,
  SaldoDevedor: any,
  parcelasPagas: any
) => {
  const taxas = [1.60, 1.64]
  const PagbankCalc = new CalculadoraGeral(taxas);
  const taxacalc = PagbankCalc.calcularTaxa(parcelaAtual,
    parcelaRestante,
    -SaldoDevedor,
    1e-6)

  const subParcela = parcelaRestante - parcelasPagas
  console.log(subParcela)
  const rate = taxacalc / 100
  
  const valorPresent = pv(rate, subParcela, -parcelaAtual)
  const valorPresenteFix = valorPresent.toFixed(2)

  const pmt = PagbankCalc.calcularPMTComParcelasPagas(
    valorPresenteFix,
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
    valorPresent,
    parcelasPagas
  };
};

export const C6DataSystem = (
  parcelaAtual: any,
  parcelaRestante: any,
  SaldoDevedor: any,
  parcelasPagas: any
) => {
  const taxas =  [1.55, 1.60, 1.65, 1.70, 1.75];
  const C6Calc = new CalculadoraGeral(taxas);
  const taxacalc = C6Calc.calcularTaxa(parcelaAtual,
    parcelaRestante,
    -SaldoDevedor,
    1e-6)

  const subParcela = parcelaRestante - parcelasPagas
  
  console.log(subParcela)
  const rate = taxacalc / 100
  
  const valorPresent = pv(rate, subParcela, -parcelaAtual)
  const valorPresenteFix = valorPresent.toFixed(2)
  const pmt = C6Calc.calcularPMTComParcelasPagas(
    valorPresenteFix,
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
    valorPresent,
    parcelasPagas
  };
};
import { pv } from 'financial'
export const CalcularTaxaSystem = (parcelaAtual:any, parcelaRestante:any, SaldoDevedor:any, parcelaPagas:any) => {


  const taxas = [ 1.45, 1.54, 1.58 , 1.68 ,1.78]
  const TaxaCalculator = new NoCalculadoraGeral(taxas)
  const TaxaCalc = TaxaCalculator.calcularTaxa(
    parcelaAtual,
    parcelaRestante,
    -SaldoDevedor,
    1e-6
  )
 
  const pmt = TaxaCalculator.calcularPMT(
      SaldoDevedor,
      parcelaRestante
  )
  const subParcela = parcelaRestante - parcelaPagas
  console.log(subParcela)
  const rate = TaxaCalc / 100
  
  const valorPresent = pv(rate, subParcela, -parcelaAtual)
 
  const vp = (parcelaAtual / rate) * (1 - Math.pow(1 + rate, -subParcela));
   const formatedVp = vp.toFixed(2) 

  const objTaxa = {
    TaxaCalc,
    valorPresent,
    formatedVp
   
  };
 
  return objTaxa



}

export const QualiDataSystem = (
  parcelaAtual: number,
  parcelaRestante: number,
  SaldoDevedor: number,
  parcelasPagas: number
) => {
  const taxas = [1.64, 1.60, 1.56, 1.52, 1.48];
  const coeficiente = [0.022, 0.0217, 0.0214, 0.0212, 0.0209];
  const acrescimos = { 1.64: 0.08, 1.60: 0.08, 1.56: 0.06, 1.52: 0.06, 1.48: 0.06 };

  const PagbankCalc = new CalculadoraGeral(taxas, coeficiente, acrescimos);
  const taxacalc = PagbankCalc.calcularTaxa(parcelaAtual, parcelaRestante, -SaldoDevedor, 1e-6);
  console.log('Taxa Calculada:', taxacalc);
  const subParcela = parcelaRestante - parcelasPagas;
  const rate = taxacalc / 100;
  const valorPresent = pv(rate, subParcela, -parcelaAtual);
  console.log('Valor Presente:', valorPresent);
  const valorPresenteFix = parseFloat(valorPresent.toFixed(2));
  const pmt = PagbankCalc.calcularPMTComParcelasPagas(
    valorPresenteFix,
    parcelaRestante,
    parcelasPagas
  );
  
  return {
    nameBank: "QualiBank",
    taxas,
    pmt,
    parcelaAtual,
    parcelaRestante,
    SaldoDevedor,
    valorPresent: valorPresenteFix,
    parcelasPagas
  };
};

