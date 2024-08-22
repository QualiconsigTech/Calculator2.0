import { useInbursaContextHook } from "@/Context/InbursaContext"
import { CalculadoraGeral } from "@/MathCalculator/GlobalCalculato"
import { saldoReal } from "@/types/SaldoReal/saldoReal"

export const CalculadoraInbursa = (parcelaAtual:any, parcelaRestante:any, SaldoDevedor:any) => {


    const taxas = [ 1.45, 1.54, 1.58 , 1.68 ,1.78]
    const InbursaCalc = new CalculadoraGeral(taxas)
    const TaxaCalc = InbursaCalc.calcularTaxa(
      parcelaAtual,
      parcelaRestante,
      -SaldoDevedor,
      1e-6
    )
    
    const pmt = InbursaCalc.calcularPMT(
        SaldoDevedor,
        parcelaRestante
    )
    
    const objInbursaPmt = {
      nameBank: 'Inbursa',
      taxas,
      pmt,
      parcelaAtual,
      parcelaRestante,
      SaldoDevedor
    };
    return objInbursaPmt



}


export const CalculadoraPagBank = (parcelaAtual:any, parcelaRestante:any, SaldoDevedor:any) =>{

  const taxas = [1.60, 1.64]
        const pagbankCalc = new CalculadoraGeral(taxas)
        const taxaPagbank = pagbankCalc.calcularTaxa(
          parcelaAtual,
          parcelaRestante,
          -SaldoDevedor,
          1e-6
        );
        const pmt = pagbankCalc.calcularPMT(SaldoDevedor, parcelaRestante)
        

        const objPagBank = {
          nameBank: 'Pagbank',
          taxas,
          pmt,
          parcelaAtual,
          parcelaRestante,
          SaldoDevedor
        };

        return objPagBank
        
}

export const CalculadoraC6 = (parcelaAtual:any, parcelaRestante:any, SaldoDevedor:any) => {
        const taxas = [1.55, 1.60, 1.65, 1.70, 1.75]

        const c6calc = new CalculadoraGeral(taxas)
        const taxaCalc = c6calc.calcularTaxa( parcelaAtual,
          parcelaRestante,
          -SaldoDevedor,
          1e-6)
        const pmt = c6calc.calcularPMT(SaldoDevedor, parcelaRestante)
        const objc6Bank = {
          nameBank: 'C6',
          taxas,
          pmt,
          parcelaAtual,
          parcelaRestante,
          SaldoDevedor
        };
      
        return objc6Bank
}


export const CalcularTaxa = (parcelaAtual:any, parcelaRestante:any, SaldoDevedor:any) => {
  const taxas = [ 1.45, 1.54, 1.58 , 1.68 ,1.78]
  const TaxaCalculator = new CalculadoraGeral(taxas)
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
  const objInbursaPmt = {
    nameBank: 'Inbursa',
    taxas,
    pmt,
    parcelaAtual,
    parcelaRestante,
    SaldoDevedor
  };
  return TaxaCalc
}

export const CalculadoraQualiBank = (parcelaAtual: any, parcelaRestante: any, SaldoDevedor: any) => {

  const taxas = [1.64, 1.60, 1.56, 1.52, 1.48];
  const coeficiente = [0.022, 0.0217, 0.0214, 0.0212, 0.0209];
  const acrescimos = { 1.64: 0.08, 1.60: 0.08, 1.56: 0.06, 1.52: 0.06, 1.48: 0.06 };
  
  const qualibank = new CalculadoraGeral(taxas, coeficiente, acrescimos);
  
  const taxaBank = qualibank.calcularTaxa(
    parcelaAtual,
    parcelaRestante,
    - SaldoDevedor,
    1e-6
  );
  
  const pmt = qualibank.calcularPMT(SaldoDevedor, parcelaRestante);
  
  const objQuali = {
    nameBank: 'QualiBank',
    taxas,
    pmt,
    parcelaAtual,
    parcelaRestante,
    SaldoDevedor
  };

  return objQuali;
}