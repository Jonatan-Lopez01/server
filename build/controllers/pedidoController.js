"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pedidoController = void 0;
const database_1 = __importDefault(require("../database"));
class PedidoController {
    insertar_pedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO pedido set ?", [req.body]);
            res.json(resp);
        });
    }
    eliminar_pedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM pedido WHERE pedido_id = ${id}`);
            res.json(resp);
        });
    }
    modificar_pedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("UPDATE pedido set ? WHERE pedido_id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    mostrar_todos_pedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM pedido');
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay  pedidos que mostrar' });
        });
    }
    mostrar_pedidos_todos_fecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM pedido WHERE DATE(pedido.fecha_pedido) =?', [`${fecha}`]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay platillos para la fecha: ' + `${fecha}` });
        });
    }
    mostrar_pedidos_mesero_fecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mesero, fecha } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM pedido P ' +
                'JOIN mesa M ON P.mesa_id = M.mesa_id ' +
                'WHERE M.mesero_id = ? AND DATE(P.fecha_pedido) = ?', [mesero, fecha]);
            if (respuesta.length > 0) {
                res.json(respuesta);
            }
            else {
                res.status(404).json({ mensaje: `No hay pedidos para el mesero ${mesero} en la fecha ${fecha}` });
            }
        });
    }
    mostrar_total_pedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT COUNT(*) AS total_pedidos FROM pedido');
            const totalPedidos = respuesta[0].total_pedidos;
            res.json({ total_pedidos: totalPedidos });
        });
    }
    mostrar_total_pedidos_todos_fecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha } = req.params;
            const respuesta = yield database_1.default.query('SELECT COUNT(*) AS total_pedidos FROM pedido WHERE DATE(pedido.fecha_pedido)=?', [fecha]);
            const totalPedidos = respuesta[0].total_pedidos;
            res.json({ total_pedidos: totalPedidos });
        });
    }
    mostrar_total_pedidos_mesero_fecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mesero, fecha } = req.params;
            const respuesta = yield database_1.default.query('SELECT COUNT(*) AS total_pedidos FROM pedido P ' +
                'JOIN mesa M ON P.mesa_id = M.mesa_id ' +
                'WHERE M.mesero_id = ? AND DATE(P.fecha_pedido) = ?', [mesero, fecha]);
            const totalPedidos = respuesta[0].total_pedidos;
            res.json({ total_pedidos: totalPedidos });
        });
    }
    mostrar_pedidos_todos_rango_fechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fechaInicio, fechaFin } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM pedido WHERE DATE(pedido.fecha_pedido) BETWEEN ? AND ?', [fechaInicio, fechaFin]);
            if (respuesta.length > 0) {
                res.json(respuesta);
            }
            else {
                res.status(404).json({ mensaje: 'No hay pedidos en el rango de fechas proporcionado' });
            }
        });
    }
    mostrar_pedidos_mesero_rango_fechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mesero, fechaInicio, fechaFin } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM pedido P ' +
                'JOIN mesa M ON P.mesa_id = M.mesa_id ' +
                'WHERE M.mesero_id = ? AND DATE(P.fecha_pedido) BETWEEN ? AND ?', [mesero, fechaInicio, fechaFin]);
            if (respuesta.length > 0) {
                res.json(respuesta);
            }
            else {
                res.status(404).json({ mensaje: `No hay pedidos para el mesero ${mesero} en el rango de fechas proporcionado` });
            }
        });
    }
    mostrar_total_pedidos_todos_rango_fechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fechaInicio, fechaFin } = req.params;
            const respuesta = yield database_1.default.query('SELECT COUNT(*) AS total_pedidos FROM pedido ' +
                'WHERE DATE(fecha_pedido) BETWEEN ? AND ?', [fechaInicio, fechaFin]);
            const totalPedidos = respuesta[0].total_pedidos;
            res.json({ total_pedidos: totalPedidos });
        });
    }
    mostrar_total_pedidos_mesero_rango_fechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { mesero, fechaInicio, fechaFin } = req.params;
            const respuesta = yield database_1.default.query('SELECT COUNT(*) AS total_pedidos FROM pedido P ' +
                'JOIN mesa M ON P.mesa_id = M.mesa_id ' +
                'WHERE M.mesero_id = ? AND DATE(P.fecha_pedido) BETWEEN ? AND ?', [mesero, fechaInicio, fechaFin]);
            const totalPedidos = respuesta[0].total_pedidos;
            res.json({ total_pedidos: totalPedidos });
        });
    }
    mostrar_pedidos_mesa_fecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numeroMesa, fecha } = req.params;
            const respuesta = yield database_1.default.query('SELECT P.pedido_id, P.mesa_id, P.fecha_pedido FROM pedido P ' +
                'JOIN mesa M ON P.mesa_id = M.mesa_id ' +
                'WHERE M.mesa_id = ? AND DATE(P.fecha_pedido) = ?', [numeroMesa, fecha]);
            if (respuesta.length > 0) {
                res.json(respuesta);
            }
            else {
                res.status(404).json({ mensaje: `No hay pedidos para la mesa ${numeroMesa} en la fecha ${fecha}` });
            }
        });
    }
    mostrar_total_pedidos_mesa_fecha(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numeroMesa, fecha } = req.params;
            const respuesta = yield database_1.default.query('SELECT COUNT(*) AS total_pedidos FROM pedido P ' +
                'JOIN mesa M ON P.mesa_id = M.mesa_id ' +
                'WHERE M.mesa_id = ? AND DATE(P.fecha_pedido) = ?', [numeroMesa, fecha]);
            if (respuesta.length > 0) {
                const totalPedidos = respuesta[0].total_pedidos;
                res.json({ total_pedidos: totalPedidos });
            }
            else {
                res.status(404).json({ mensaje: `No hay pedidos para la mesa ${numeroMesa} en la fecha ${fecha}` });
            }
        });
    }
    mostrar_pedidos_mesa_rango_fechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numeroMesa, fechaInicio, fechaFin } = req.params;
            const respuesta = yield database_1.default.query('SELECT P.pedido_id, P.mesa_id, P.fecha_pedido FROM pedido P ' +
                'JOIN mesa M ON P.mesa_id = M.mesa_id ' +
                'WHERE M.mesa_id = ? AND DATE(P.fecha_pedido) BETWEEN ? AND ?', [numeroMesa, fechaInicio, fechaFin]);
            if (respuesta.length > 0) {
                res.json(respuesta);
            }
            else {
                res.status(404).json({ mensaje: `No hay pedidos para la mesa ${numeroMesa} en el rango de fechas proporcionado` });
            }
        });
    }
    mostrar_total_pedidos_mesa_rango_fechas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numeroMesa, fechaInicio, fechaFin } = req.params;
            const respuesta = yield database_1.default.query('SELECT COUNT(*) AS total_pedidos FROM pedido P ' +
                'JOIN mesa M ON P.mesa_id = M.mesa_id ' +
                'WHERE M.mesa_id = ? AND DATE(P.fecha_pedido) BETWEEN ? AND ?', [numeroMesa, fechaInicio, fechaFin]);
            const totalPedidos = respuesta.length > 0 ? respuesta[0].total_pedidos : 0;
            res.json({ total_pedidos: totalPedidos });
        });
    }
}
exports.pedidoController = new PedidoController();
