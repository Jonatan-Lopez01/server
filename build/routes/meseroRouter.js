"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const meseroController_1 = require("../controllers/meseroController");
class MeseroRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/insertarMesero/', meseroController_1.meseroController.insertar_mesero);
        this.router.delete('/eliminarMesero/:id', meseroController_1.meseroController.eliminar_mesero);
        this.router.put('/modificarMesero/:id', meseroController_1.meseroController.modificar_mesero);
        this.router.get('/mostrarTodosMeseros/', meseroController_1.meseroController.mostrar_todos_meseros);
        this.router.get('/buscarUnMeseroId/:id', meseroController_1.meseroController.buscar_mesero_id);
        this.router.get('/buscarMeserosNombre/:nombre', meseroController_1.meseroController.buscar_mesero_nombre);
        this.router.get('/buscarMeserosNombreOrIdOrTelefono/:idOrNombre', meseroController_1.meseroController.buscar_mesero_id_nombre_telefono);
    }
}
const meseroRouter = new MeseroRouter();
exports.default = meseroRouter.router;
