"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController"); //checar el noombre del objeto de platillo controler, debe coincidir
class UsuarioRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/verificarUsuario/', usuarioController_1.usuarioController.verificar_usuario);
        this.router.post('/insertarUsuario/', usuarioController_1.usuarioController.insertar_usuario);
        this.router.delete('/eliminarUsuario/:id', usuarioController_1.usuarioController.eliminar_usuario);
        this.router.put('/modificarUsuario/:id', usuarioController_1.usuarioController.modificar_usuario);
        this.router.get('/mostrarTodosUsuarios/', usuarioController_1.usuarioController.mostrar_todos_usuarios);
        this.router.get('/buscarUnUsuarioId/:id', usuarioController_1.usuarioController.buscar_usuario_id);
        this.router.get('/buscarUsuarioOrId/:UsuarioOrId', usuarioController_1.usuarioController.buscar_usuario_or_id);
    }
}
const usuarioRouter = new UsuarioRouter();
exports.default = usuarioRouter.router;
