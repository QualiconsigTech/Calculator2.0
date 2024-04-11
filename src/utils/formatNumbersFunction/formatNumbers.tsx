export const FormatedNumber = (number: number) => {
  
  if(number ) {
    if(number !== undefined) {
      const fixedNumber = number.toFixed(2);
      const parts = fixedNumber.split('.');
      let integerPart = parts[0];
      const decimalPart = parts[1];
  
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
      return `${integerPart},${decimalPart}`;

    }
  }
  
    
  }