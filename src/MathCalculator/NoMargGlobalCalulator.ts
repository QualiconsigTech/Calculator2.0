export class NoCalculadoraGeral {
  taxas: number[];
  taxa : number | any
  
  constructor(taxas: any) {
    this.taxas = taxas;
  }

  private parseNumber(value: any): number {
    // Verifica se o valor é uma string e substitui a vírgula pelo ponto
    if (typeof value === "string") {
      return parseFloat(value.replace(",", "."));
    }
    return value;
  }

  calcularPMT(valorPresente: any, numeroParcelas: any): number[] {
    const valorPresenteNumber = this.parseNumber(valorPresente);
    const result: number[] = [];
    this.taxas.forEach((taxa: number) => {
      const tax = this.parseNumber(taxa)
      const tx = tax / 100;
      let total =
        (valorPresenteNumber * tx) / (1 - Math.pow(1 + tx, -numeroParcelas));
      const pmtResult = parseFloat(total.toFixed(2));
      result.push(pmtResult);
    });
    return result;
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
    this.taxa = taxaAtual.toFixed(2) 
    return parseFloat(taxaAtual.toFixed(2));
  }

  calcularPMTComParcelasPagas(
    valorPresente: any,
    numeroParcelas: any,
    parcelasPagas: number
  ): number[] {
    const valorPresenteNumber = this.parseNumber(valorPresente);
    const result: number[] = [];
    this.taxas.forEach((taxa: number) => {
      const tax = this.parseNumber(taxa);
      const tx = tax / 100;
      let total =
        (valorPresenteNumber * tx) /
        (1 - Math.pow(1 + tx, -(numeroParcelas - parcelasPagas)));
      const pmtResult = parseFloat(total.toFixed(2));
      result.push(pmtResult);
    });
    return result;
  }

 
}