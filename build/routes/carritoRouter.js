"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController_1 = require("../controllers/carritoController"); //checar el noombre del objeto de platillo controler, debe coincidir
class CarritoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //este servicio lo ocupan los meseros
        this.router.post('/insertarAlCarrito/', carritoController_1.carritoController.insertar_al_carrito);
        //puede no ocuparse este servicio
        this.router.delete('/eliminarDelCarrito/:id', carritoController_1.carritoController.eliminar_del_carrito);
        //podria usarse cuando el administrador le haga un descuento al precio de un producto a un cliente
        this.router.put('/modificarDelCarrito/:id', carritoController_1.carritoController.modificar_del_carrito);
        this.router.get('/mostrarTodosProductosCarrito/', carritoController_1.carritoController.mostrar_todos_productos_del_carrito);
        /*SERVICIOS RELACIONADOS A LA INSERCCION DE PRODUCTOS POR LOS MESEROS */
        /*SERVICIOS RELACIONADOS AL COBRO DEL ADMINISTRADOR A LAS MESAS*/
        //Mostrar todos los productos que se han levantado dependiendo de el numeroMesa
        this.router.get('/mostrarProductosCarrito/:numeroMesa', carritoController_1.carritoController.mostrar_productos_carrito_numeroMesa);
        this.router.get('/obtenerTotal/:numeroMesa', carritoController_1.carritoController.obtener_total);
        //eliminar todos los productos que se han levantado dependiendo el numero de mesa, ya que se hizo el cobro
        this.router.delete('/eliminarProductosDelCarrito/:numeroMesa', carritoController_1.carritoController.eliminar_productos_carrito_numeroMesa);
        this.router.put('/modificarEstado/:id', carritoController_1.carritoController.modificar_estado_carrito_producto);
    }
}
const carritoRouter = new CarritoRouter();
exports.default = carritoRouter.router;
