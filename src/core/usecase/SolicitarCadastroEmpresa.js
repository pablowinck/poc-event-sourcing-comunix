import { EventBuilder } from "../entity/EventBuilder.js";
import { CNPJValidator } from "../service/CNPJValidator.js";

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
        const cnpj = dto.cnpj.replace(/[^\d]+/g, '');
        CNPJValidator.valid(cnpj);
        if (!dto?.nome.trim())
            throw new Error('Invalid name');
    }


}