import { EventBuilder } from "../../core/entity/EventBuilder.js";
import { SolicitarCadastroEmpresa } from "../../core/usecase/SolicitarCadastroEmpresa.js";

export class EmpresaController {
  constructor(eventManager) {
    eventManager.on("/empresa", this.handleEmpresa.bind(this));
    this.eventManager = eventManager;
    this.solicitarCadastroEmpresa = new SolicitarCadastroEmpresa(eventManager);
  }

  handleEmpresa({ req, res }) {
    req.on("data", (chunk) => {
      try {
        req.body = JSON.parse(chunk.toString());
        this.solicitarCadastroEmpresa.execute(req.body);
        res.end(JSON.stringify({ message: "solicitação em processamento" }));
      } catch (e) {
        this.eventManager.emit(
          EventBuilder.build({
            feature: "cadastro-empresa",
            action: "solicitacao-falhou",
          }),
          { ...req.body, errorMessage: e.message },
        );
        res.statusCode = 400;
        res.end(JSON.stringify({ message: e.message }));
      }
    });
  }
}
