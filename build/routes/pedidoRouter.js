"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoController_1 = require("../controllers/pedidoController");
class PedidoRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/mostrarTodosUsuarios/',(req,res) => res.send('probando usuarios'));
        this.router.post('/insertarPedido/', pedidoController_1.pedidoController.insertar_pedido);
        this.router.delete('/eliminarPedido/:id', pedidoController_1.pedidoController.eliminar_pedido);
        this.router.put('/modificarPedido/:id', pedidoController_1.pedidoController.modificar_pedido);
        // Mostrar todos los pedidos de la tabla "pedido" lo que se puede interpretar tambien como mostrar todos los pedidos que se han hecho por todos los meseros desde que inicio el sistema
        this.router.get('/mostrarTodosPedidos/', pedidoController_1.pedidoController.mostrar_todos_pedidos);
        // Mostrar todos los pedidos que han hecho todos los meseros que trabajan en el restaurante en una fecha específica, la fecha debe ser pasada con el mformato AÑO-MES-DIA
        this.router.get('/pedidos/todos/:fecha', pedidoController_1.pedidoController.mostrar_pedidos_todos_fecha);
        // Mostrar todos los pedidos hechos por un mesero especifico en una fecha específica
        this.router.get('/pedidos/:mesero/:fecha', pedidoController_1.pedidoController.mostrar_pedidos_mesero_fecha);
        // Devuelve el total de pedidos que hay en la tabla pedido, aqui se cuentan todos los pedidos desde que inicio el sistema o todos los pedidos que los meseros han hecho , lo devueve una cantidad cuantificada 
        this.router.get('/pedidos/total/tabla', pedidoController_1.pedidoController.mostrar_total_pedidos);
        // Devuelve cuántos pedidos hay en total en la tabla pedido lo cual tambien se puede interpretar como cuantos pedidos se han hecho por todos los meseros en una fecha específica
        this.router.get('/pedidos/total/todos/:fecha', pedidoController_1.pedidoController.mostrar_total_pedidos_todos_fecha);
        // Devuelve cuántos pedidos ha hecho un mesero especifico en una fecha específica
        this.router.get('/pedidos/total/:mesero/:fecha', pedidoController_1.pedidoController.mostrar_total_pedidos_mesero_fecha);
        // Mostrar todos los pedidos hechos por todos los meseros en un rango de fechas
        this.router.get('/pedidos/todos/:fechaInicio/:fechaFin', pedidoController_1.pedidoController.mostrar_pedidos_todos_rango_fechas);
        // Mostrar todos los pedidos que un mesero especifico ha realizado en un rango de fechas
        this.router.get('/pedidos/:mesero/:fechaInicio/:fechaFin', pedidoController_1.pedidoController.mostrar_pedidos_mesero_rango_fechas);
        // Devuelve cuantos pedidos han hecho todos los meseros en un rango de fechas
        this.router.get('/pedidos/total/todos/:fechaInicio/:fechaFin', pedidoController_1.pedidoController.mostrar_total_pedidos_todos_rango_fechas);
        // devuelve cuántos pedidos ha hecho un mesero en un rango de fechas
        this.router.get('/pedidos/total/:mesero/:fechaInicio/:fechaFin', pedidoController_1.pedidoController.mostrar_total_pedidos_mesero_rango_fechas);
        // Mostrar todos los pedidos hechos en una mesa en una fecha específica
        this.router.get('/pedidos/mesa/mostrar/:numeroMesa/:fecha', pedidoController_1.pedidoController.mostrar_pedidos_mesa_fecha);
        // Mostrar cuántos pedidos fueron hechos en una mesa en una fecha específica
        this.router.get('/pedidos/total/sobre/mesa/:numeroMesa/:fecha', pedidoController_1.pedidoController.mostrar_total_pedidos_mesa_fecha);
        // Mostrar todos los pedidos hechos en una mesa especifica  en un rango de fechas
        this.router.get('/pedidos/mesa/rango/:numeroMesa/:fechaInicio/:fechaFin', pedidoController_1.pedidoController.mostrar_pedidos_mesa_rango_fechas);
        // Mostrar cuántos pedidos fueron hechos en una mesa especifica en un rango de fechas
        this.router.get('/pedidos/mesa/numero/:numeroMesa/:fechaInicio/:fechaFin', pedidoController_1.pedidoController.mostrar_total_pedidos_mesa_rango_fechas);
    }
}
const pedidoRouter = new PedidoRouter();
exports.default = pedidoRouter.router;
