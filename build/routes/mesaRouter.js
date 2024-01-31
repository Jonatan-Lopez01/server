"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mesaController_1 = require("../controllers/mesaController");
class MesaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/insertarMesa/', mesaController_1.mesaController.insertar_mesa);
        this.router.delete('/eliminarMesa/:id', mesaController_1.mesaController.eliminar_mesa);
        this.router.put('/modificarMesa/:id', mesaController_1.mesaController.modificar_mesa);
        this.router.get('/mostrarTodasMesas/', mesaController_1.mesaController.mostrar_todas_mesas);
        this.router.get('/buscarUnaMesaId/:id', mesaController_1.mesaController.buscar_mesa_id);
        this.router.get('/buscarMesaNumero/:nombre', mesaController_1.mesaController.buscar_mesa_numero);
        this.router.get('/buscarMesaNumeroOrId/:idNumesa', mesaController_1.mesaController.buscar_mesa_id_numeroMesa);
    }
}
const mesaRouter = new MesaRouter();
exports.default = mesaRouter.router;
