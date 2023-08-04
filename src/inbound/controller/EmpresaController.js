import { EventBuilder } from "../../core/entity/EventBuilder.js"
import { SolicitarCadastroEmpresa } from "../../core/usecase/SolicitarCadastroEmpresa.js";

export class EmpresaController {

    constructor(eventManager) {
        eventManager.on('/empresa', this.handleEmpresa.bind(this))
        this.eventManager = eventManager
        this.solicitarCadastroEmpresa = new SolicitarCadastroEmpresa(eventManager);
    }

    handleEmpresa({ req, res }) {
        req.on('data', (chunk) => {
            req.body = JSON.parse(chunk.toString())
            const user = req.headers['user-id']
            console.log(req);
            this.solicitarCadastroEmpresa.execute(req.body)
            res.end('Empresa controller fired for user ' + user)
        })
    }

}