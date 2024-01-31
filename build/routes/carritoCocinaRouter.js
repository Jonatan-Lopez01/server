"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoCocinaController_1 = require("../controllers/carritoCocinaController");
class CarritoCocinaRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/insertarPlatilloCocina/', carritoCocinaController_1.carritoCocinaController.insertar_platillo_cocina);
        this.router.delete('/eliminarPlatilloCocina/:id', carritoCocinaController_1.carritoCocinaController.eliminar_platillo_cocina);
        this.router.get('/mostrarPlatillosCocina/', carritoCocinaController_1.carritoCocinaController.mostrar_cocina_platillos);
        this.router.get('/buscarPlatilloIdCocina/:id', carritoCocinaController_1.carritoCocinaController.buscar_platillo_id);
        this.router.put('/modificarEstado/:id', carritoCocinaController_1.carritoCocinaController.modificar_estado_platillo_cocina);
    }
}
const carritoCocinaRouter = new CarritoCocinaRouter();
exports.default = carritoCocinaRouter.router;
