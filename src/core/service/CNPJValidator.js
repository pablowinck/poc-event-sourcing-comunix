export class CNPJValidator {
    static valid(cnpj) {
        const cnpjOnlyNumbers = cnpj.replace(/[^\d]+/g, '');
        if (cnpjOnlyNumbers.length !== 14) {
            throw new Error('Invalid CNPJ');
        }
        if (this.#isJustOneDigitRepeated(cnpjOnlyNumbers))
            throw new Error('Invalid CNPJ');
        let sum = 0;
        let pos = 5;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cnpjOnlyNumbers.charAt(i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(cnpjOnlyNumbers.charAt(12))) {
            throw new Error('Invalid CNPJ');
        }
        sum = 0;
        pos = 6;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cnpjOnlyNumbers.charAt(i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(cnpjOnlyNumbers.charAt(13))) {
            throw new Error('Invalid CNPJ');
        }
    }

    static #isJustOneDigitRepeated(cnpj) {
        const firstDigit = cnpj.charAt(0);
        for (let i = 1; i < cnpj.length; i++) {
            if (cnpj.charAt(i) !== firstDigit) {
                return false;
            }
        }
        return true;
    }
}