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
exports.carritoController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos, de cajon
class CarritoController {
    insertar_al_carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO carrito set ?", [req.body]);
            res.json(resp);
        });
    }
    eliminar_del_carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM carrito WHERE carrito_id = ${id}`);
            res.json(resp);
        });
    }
    modificar_del_carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("UPDATE carrito set ? WHERE carrito_id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    mostrar_todos_productos_del_carrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM carrito');
            res.json(respuesta);
        });
    }
    mostrar_productos_carrito_numeroMesa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numeroMesa } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM carrito WHERE numeroMesa= ?', [numeroMesa]);
            res.json(respuesta);
        });
    }
    eliminar_productos_carrito_numeroMesa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numeroMesa } = req.params;
            const resp = yield database_1.default.query('DELETE FROM carrito WHERE numeroMesa= ?', [numeroMesa]);
            res.json(resp);
        });
    }
    modificar_estado_carrito_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { estado } = req.body;
            if (!['Enviado', 'No enviado'].includes(estado)) {
                res.status(400).json({ error: 'Valor de estado no permitido' });
                return;
            }
            const resp = yield database_1.default.query("UPDATE carrito SET estado = ? WHERE carrito_id = ?", [estado, id]);
            res.json(resp);
        });
    }
    obtener_total(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const numeroMesa = req.params.numeroMesa; // Asumiendo que el número de mesa está en los parámetros de la solicitud
                const respuesta = yield database_1.default.query('SELECT SUM(subtotal) AS total_subtotal FROM carrito WHERE numeroMesa = ?', [numeroMesa]);
                res.json(respuesta[0]); // Devolver la respuesta como JSON
            }
            catch (error) {
                console.error('Error al obtener la suma de subtotales por mesa:', error);
                res.status(500).json({ error: 'Error al obtener la suma de subtotales por mesa' });
            }
        });
    }
}
exports.carritoController = new CarritoController();
