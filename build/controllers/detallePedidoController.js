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
exports.detallePedidoController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos, de cajon
class DetallePedidoController {
    insertar_detalle_pedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO detalle_pedido set ?", [req.body]);
            res.json(resp);
        });
    }
    eliminar_detalle_pedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM detalle_pedido WHERE detalle_id = ${id}`);
            res.json(resp);
        });
    }
    modificar_detalle_pedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("UPDATE detalle_pedido set ? WHERE detalle_id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    mostrar_todos_detalles_pedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM detalle_pedido');
            res.json(respuesta);
        });
    }
}
exports.detallePedidoController = new DetallePedidoController();
