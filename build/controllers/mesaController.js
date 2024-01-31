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
exports.mesaController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos, de cajon
class MesaController {
    insertar_mesa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO mesa set ?", [req.body]);
            res.json(resp); //si el affectrow =1 se inserto
        });
    }
    eliminar_mesa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM mesa WHERE mesa_id = ${id}`);
            res.json(resp);
        });
    }
    buscar_mesa_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM mesa WHERE mesa_id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Mesa no encontrada por id' });
        });
    }
    buscar_mesa_numero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM mesa WHERE numero = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Mesa no encontrada por id' });
        });
    }
    modificar_mesa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(id);
            const resp = yield database_1.default.query("UPDATE mesa set ? WHERE mesa_id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    mostrar_todas_mesas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM mesa ORDER BY numero ASC');
            res.json(respuesta);
        });
    }
    buscar_mesa_id_numeroMesa(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idNumesa } = req.params;
            try {
                const respuesta = yield database_1.default.query(`
                SELECT * FROM mesa
                WHERE mesa_id = ? OR numero= ?;
            `, [idNumesa, idNumesa]);
                if (respuesta.length > 0) {
                    res.json(respuesta); // Se encontraron resultados
                }
                else {
                    res.status(404).json({ mensaje: 'No se encontraron mesas que coincidan con la búsqueda.' });
                }
            }
            catch (error) {
                console.error('Error al buscar mesa:', error);
                res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }
}
exports.mesaController = new MesaController();
