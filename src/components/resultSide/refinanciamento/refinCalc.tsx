import { CalculadoraRefinanciamento } from "./calculadoraRefinGeral";

export class BaseDeCalculo {

  private constructor(
    readonly parcelaAtual: number,
    readonly parcelaRestante: number,
    readonly saldoDevedor: number
  ) {}

  // static inbursaCalculator(
  //   parcelaAtual: number,
  //   parcelaRestante: number,
  //   saldoDevedor: number,
  //   taxaResponse: any
  // ) {
  //   const inbursaTaxas = [1.45, 1.54, 1.58, 1.68, 1.78];
  //   const calculadoraInbursa = new CalculadoraRefinanciamento(inbursaTaxas, taxaResponse);
  //   const resultadosInbursa = calculadoraInbursa.calcularRefinanciamento(
  //     parcelaAtual,
  //     parcelaRestante,
  //     saldoDevedor,
  //     inbursaTaxas,
  //     taxaResponse
  //   );
  //   return {data : {
  //     dados : resultadosInbursa,
  //     nameBank: "Inbursa"
  //   }};
  // }

  static pagbankCalculator(
    parcelaAtual: number,
    parcelaRestante: number,
    saldoDevedor: number,
    taxaResponse: any
  ) {
    const pagBankTaxas = [1.6, 1.64];
    const pagBankCoeficientes = [0.022142, 0.022610]
    const calculadoraPagbank = new CalculadoraRefinanciamento(pagBankTaxas, taxaResponse);
    const resultadosPagbank = calculadoraPagbank.calcularRefinanciamento(
      parcelaAtual,
      parcelaRestante,
      saldoDevedor,
      pagBankTaxas,
      taxaResponse,
      pagBankCoeficientes
    );
    return {
      data : {
        dados: resultadosPagbank,
        nameBank: "Pagbank"
      }
    };
  }

  static c6Calculator(
    parcelaAtual: number,
    parcelaRestante: number,
    saldoDevedor: number,
    taxaResponse: any
  ) {
    const c6Taxas = [1.55, 1.6, 1.65, 1.7, 1.75];
    const c6Coeficientes = [0.02250000, 0.02290000, 0.02352000, 0.02330000, 0.02360000]
    const calculadoraC6 = new CalculadoraRefinanciamento(c6Taxas, taxaResponse);
    const resultadosC6 = calculadoraC6.calcularRefinanciamento(
      parcelaAtual,
      parcelaRestante,
      saldoDevedor,
      c6Taxas,
      taxaResponse,
      c6Coeficientes
    );
    return {data: {
      nameBank: "C6",
      dados: resultadosC6
    }};
  }

  static CalculadoraQualiBank(
    parcelaAtual: number,
    parcelaRestante: number,
    saldoDevedor: number,
    taxaResponse: any
  ) {
    const qualitaxas = [1.64, 1.60, 1.56, 1.52, 1.48];
    const qualiCoeficientes = [0.022, 0.0217, 0.0214, 0.0212, 0.0209]
    const calculadoraquali = new CalculadoraRefinanciamento(qualitaxas, taxaResponse);
    const resultadosquali = calculadoraquali.calcularRefinanciamento(
      parcelaAtual,
      parcelaRestante,
      saldoDevedor,
      qualitaxas,
      taxaResponse,
      qualiCoeficientes
    );
    return {data: {
      nameBank: "qualibank",
      dados: resultadosquali
    }};
  }
}
  