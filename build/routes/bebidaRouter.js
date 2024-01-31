"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bebidaController_1 = require("../controllers/bebidaController"); //checar el noombre del objeto de platillo controler, debe coincidir
class BebidaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/insertarBebida/', bebidaController_1.bebidaController.insertar_bebida);
        this.router.delete('/eliminarBebida/:id', bebidaController_1.bebidaController.eliminar_bebida);
        this.router.put('/modificarBebida/:id', bebidaController_1.bebidaController.modificar_bebida);
        this.router.get('/mostrarTodasBebidas/', bebidaController_1.bebidaController.mostrar_todas_bebidas);
        this.router.get('/buscarUnaBebidaId/:id', bebidaController_1.bebidaController.buscar_bebida_id);
        this.router.get('/buscarBebidasNombre/:nombre', bebidaController_1.bebidaController.buscar_bebida_nombre);
        this.router.get('/buscarBebidaIdOrNombre/:IdNombre', bebidaController_1.bebidaController.buscar_bebida_con_nombreORid);
    }
}
const bebidaRouter = new BebidaRouter();
exports.default = bebidaRouter.router;
