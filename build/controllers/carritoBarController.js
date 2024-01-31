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
exports.carritoBarController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos, de cajon
class CarritoBarController {
    insertar_bebida_bar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO carrito_bar set ?", [req.body]);
            res.json(resp);
        });
    }
    eliminar_bebida_bar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM carrito_bar WHERE bar_id = ${id}`);
            res.json(resp);
        });
    }
    modificar_bebida_bar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(id);
            const resp = yield database_1.default.query("UPDATE carrito_bar set ? WHERE bar_id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    mostrar_todas_bebidas_bar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM carrito_bar ORDER BY fecha ASC');
            res.json(respuesta);
        });
    }
    buscar_bebida_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM carrito_bar WHERE bar_id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Bebida no encontrado por id del bar' });
        });
    }
    modificar_estado_bar_de_bebida(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { estado } = req.body;
            if (!['pendiente', 'preparando'].includes(estado)) {
                res.status(400).json({ error: 'Valor de estado no permitido' });
                return;
            }
            const resp = yield database_1.default.query("UPDATE carrito_bar SET estado = ? WHERE bar_id = ?", [estado, id]);
            res.json(resp);
        });
    }
}
exports.carritoBarController = new CarritoBarController();
