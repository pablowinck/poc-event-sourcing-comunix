import { EventBuilder } from "../entity/EventBuilder.js";

export class SolicitarCadastroEmpresa {

    constructor(eventManager) {
        this.eventManager = eventManager
    }

    execute(dto) {
        try {
            this.#validar(dto);
            this.eventManager.emit(EventBuilder.build({ feature: 'cadastro-empresa', action: 'solicitado' }), dto);
        } catch (e) {
            this.eventManager.emit(EventBuilder.build({ feature: 'cadastro-empresa', action: 'solicitacao-falhou' }), dto);
            throw e;
        }
    }

    #validar(dto) {
        console.log(JSON.stringify(dto));
        const cnpj = dto.cnpj.replace(/[^\d]+/g, '');
        if (cnpj.length !== 14) {
            throw new Error('Invalid CNPJ');
        }
        let sum = 0;
        let pos = 5;
        for (let i = 0; i < 12; i++) {
            sum += parseInt(cnpj.charAt(i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(cnpj.charAt(12))) {
            throw new Error('Invalid CNPJ');
        }
        sum = 0;
        pos = 6;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(cnpj.charAt(i)) * pos--;
            if (pos < 2) {
                pos = 9;
            }
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(cnpj.charAt(13))) {
            throw new Error('Invalid CNPJ');
        }
    }


}