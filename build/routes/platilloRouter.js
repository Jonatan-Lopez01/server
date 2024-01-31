"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const platilloController_1 = require("../controllers/platilloController"); //checar el noombre del objeto de platillo controler, debe coincidir
class PlatilloRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/insertarPlatillo', platilloController_1.platilloController.insertar_platillo);
        this.router.delete('/eliminarPlatillo/:id', platilloController_1.platilloController.eliminar_platillo);
        this.router.put('/modificarPlatillo/:id', platilloController_1.platilloController.modificar_platillo);
        this.router.get('/mostrarTodosPlatillos/', platilloController_1.platilloController.mostrar_todos_platillos);
        this.router.get('/buscarUnPlatilloId/:id', platilloController_1.platilloController.buscar_platillo_id);
        this.router.get('/buscarPlatillosNombre/:nombre', platilloController_1.platilloController.buscar_platillo_nombre);
        this.router.get('/buscarPlatilloIdOrNombre/:IdNombre', platilloController_1.platilloController.buscar_platillo_con_nombreORid);
    }
}
const platilloRouter = new PlatilloRouter();
exports.default = platilloRouter.router;
