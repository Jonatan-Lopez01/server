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
exports.bebidaController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos, de cajon
class BebidaController {
    insertar_bebida(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO bebida set ?", [req.body]);
            res.json(resp);
        });
    }
    eliminar_bebida(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM bebida WHERE bebida_id = ${id}`);
            res.json(resp);
        });
    }
    buscar_bebida_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM bebida WHERE bebida_id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Platillo no encontrado por id' });
        });
    }
    buscar_bebida_nombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM bebida WHERE nombre LIKE ?', [`%${nombre}%`]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'Bbebida con nombre= <' + `${nombre}` + '> no encontrada' });
        });
    }
    modificar_bebida(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(id);
            const resp = yield database_1.default.query("UPDATE bebida set ? WHERE bebida_id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    mostrar_todas_bebidas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM bebida ORDER BY bebida_id DESC');
            res.json(respuesta);
        });
    }
    buscar_bebida_con_nombreORid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { IdNombre } = req.params;
            try {
                const respuesta = yield database_1.default.query(`
                SELECT * FROM bebida
                WHERE bebida_id = ? OR nombre LIKE ?;
            `, [IdNombre, `%${IdNombre}%`]);
                if (respuesta.length > 0) {
                    res.json(respuesta); // Se encontraron resultados
                }
                else {
                    res.status(404).json({ mensaje: 'No se encontraron bebidas que coincidan con la búsqueda.' });
                }
            }
            catch (error) {
                console.error('Error al buscar bebida:', error);
                res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }
}
exports.bebidaController = new BebidaController();
