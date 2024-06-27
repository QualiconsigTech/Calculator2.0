export class CalculadoraRefinanciamento {
  taxas: number[];
  taxasAntigas: number;

  constructor(taxas: number[], taxaResponse: any) {
    this.taxas = taxas;
    this.taxasAntigas = this.parseNumber(taxaResponse);
  }

  private parseNumber(value: any): number {
    if (typeof value === "string") {
      return parseFloat(value.replace(",", "."));
    }
    return value;
  }

  calcularPMT(valorPresente: any, numeroParcelas: any): number[] {
    const valorPresenteNumber = this.parseNumber(valorPresente);
    const result: number[] = [];
    this.taxas.forEach((taxa: number) => {
      const tax = this.parseNumber(taxa) + 0.05;
      const tx = tax / 100;
      let total =
        (valorPresenteNumber * tx) / (1 - Math.pow(1 + tx, -numeroParcelas));
      const pmtResult = parseFloat(total.toFixed(2));
      result.push(pmtResult);
    });
    return result;
  }

  calcularVP(nper: number, pmt: number, taxa: number) {
    const rate = taxa / 100;
    const vp = pmt * ((1 - Math.pow(1 + rate, -nper)) / rate);
    return vp;
  }

  calcularTaxa(
    pagamento: number,
    numeroDePeriodos: number,
    valorPresente: any,
    precisao = 1e-9
  ): number {
    const valorPresenteNumber = this.parseNumber(valorPresente);
    let taxaMin = 0.0;
    let taxaMax = 1.0;

    function valorPresenteComTaxa(taxa: number) {
      if (taxa === 0) {
        return valorPresenteNumber + pagamento * numeroDePeriodos;
      } else {
        return (
          valorPresenteNumber +
          (pagamento * (1 - Math.pow(1 + taxa, -numeroDePeriodos))) / taxa
        );
      }
    }

    if (valorPresenteComTaxa(taxaMin) * valorPresenteComTaxa(taxaMax) >= 0) {
      return 0;
    }

    while (taxaMax - taxaMin >= precisao) {
      const taxaMeio = (taxaMin + taxaMax) / 2;
      const vpMeio = valorPresenteComTaxa(taxaMeio);

      if (vpMeio === 0) {
        break;
      } else if (vpMeio * valorPresenteComTaxa(taxaMin) < 0) {
        taxaMax = taxaMeio;
      } else {
        taxaMin = taxaMeio;
      }
    }
    const taxaAtual = taxaMin * 100;
    return parseFloat(taxaAtual.toFixed(2));
  }

  calcularRefinanciamento(
    parcelaAtual: any,
    parcelaRestante: any,
    saldoDevedor: any,
    taxasAnuais: number[],
    taxaResponse: any,
    coeficientesTaxas: number[]
  ): { saldoDevedor: number; troco: number; novoValorEmprestimo: number; novaParcela: number; taxa: number; taxaAntiga: number }[] {
    const valorPresenteNumber = this.parseNumber(saldoDevedor);
    const taxaResponseNumber = this.parseNumber(taxaResponse);
    const resultados: { saldoDevedor: number; troco: number; novoValorEmprestimo: number; novaParcela: number; taxa: number; taxaAntiga: number }[] = [];

    // Calcula o valor já pago até o momento
    const valorJaPago = parcelaAtual * (84 - parcelaRestante);

    for (let coeficienteIndice in coeficientesTaxas) {
      const taxaMensalNova = taxasAnuais[coeficienteIndice];
      const taxaMensalOriginal = taxaResponseNumber / 100;

      // Calcula o novo valor do empréstimo considerando a nova taxa
      const novoValorEmprestimo = valorPresenteNumber + valorJaPago;

      // Calcula a nova parcela com a nova taxa
      const novaParcela = (novoValorEmprestimo * taxaMensalNova) / (1 - Math.pow(1 + taxaMensalNova, -84));

      // Ajusta a nova parcela para ser igual à parcela atual
      const novaParcelaAjustada = parcelaAtual;

      // Calcula o saldo devedor com a nova taxa mantendo a mesma parcela
      const novoSaldoDevedor = novaParcelaAjustada / coeficientesTaxas[coeficienteIndice];

      //const novoSaldoDevedor = novaParcelaAjustada / 0.022142;


      // Calcula o troco que a pessoa receberá
      const troco = novoSaldoDevedor - saldoDevedor

      resultados.push({
        saldoDevedor: parseFloat(saldoDevedor.toFixed(2)),
        troco: parseFloat(troco.toFixed(2)),
        novoValorEmprestimo: parseFloat(novoValorEmprestimo.toFixed(2)),
        novaParcela: parseFloat(novaParcelaAjustada.toFixed(2)),
        taxa: taxasAnuais[coeficienteIndice],
        taxaAntiga: taxaResponseNumber
      });
    }

    return resultados;
  }
}
