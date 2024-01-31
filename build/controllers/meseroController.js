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
exports.meseroController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos, de cajon
class MeseroController {
    insertar_mesero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield database_1.default.query("INSERT INTO mesero SET ?", [req.body]);
                if (resp.affectedRows > 0) {
                    res.status(201).json({ success: true, message: 'Mesero insertado exitosamente' });
                }
                else {
                    res.status(400).json({ success: false, message: 'No se pudo insertar el mesero' });
                }
            }
            catch (error) {
                console.error('Error al insertar el mesero:', error);
                res.status(500).json({ success: false, message: 'Error interno del servidor' });
            }
        });
    }
    eliminar_mesero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('DELETE FROM mesero WHERE mesero_id = ?', [id]);
            res.json(resp);
        });
    }
    buscar_mesero_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM mesero WHERE mesero_id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Meser@ no encontrado por id' });
        });
    }
    buscar_mesero_nombre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM mesero WHERE nombre LIKE ?', [`%${nombre}%`]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.status(404).json({ 'mensaje': 'Meser@ con nombre= <' + `${nombre}` + '> no encontrad@' });
        });
    }
    modificar_mesero(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(id);
            const resp = yield database_1.default.query("UPDATE mesero set ? WHERE mesero_id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    buscar_mesero_id_nombre_telefono(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idOrNombre } = req.params;
            try {
                const respuesta = yield database_1.default.query(`
                SELECT * FROM mesero
                WHERE mesero_id = ? OR nombre LIKE ? OR telefono = ?;
            `, [idOrNombre, `%${idOrNombre}%`, idOrNombre]);
                if (respuesta.length > 0) {
                    res.json(respuesta); // Se encontraron resultados
                }
                else {
                    res.status(404).json({ mensaje: 'No se encontraron meseros que coincidan con la búsqueda.' });
                }
            }
            catch (error) {
                console.error('Error al buscar mesero:', error);
                res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }
    mostrar_todos_meseros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM mesero ORDER BY mesero_id DESC');
            res.json(respuesta);
        });
    }
}
exports.meseroController = new MeseroController();
