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
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../database")); //acceso a la base de datos, de cajon
class UsuarioController {
    verificar_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, contrasenia } = req.body;
            // Verificar si el usuario y la contraseña coinciden en la base de datos
            const respuesta = yield database_1.default.query('SELECT * FROM acceso WHERE usuario= ? AND contrasenia= ? ', [usuario, contrasenia]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
            }
            else {
                res.json({ "id": "-1" });
            }
        });
    }
    insertar_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO acceso set ?", [req.body]);
            res.json(resp);
        });
    }
    eliminar_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM acceso WHERE id = ${id}`);
            res.json(resp);
        });
    }
    buscar_usuario_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM acceso WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Usuario no encontrado por id' });
        });
    }
    modificar_usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //console.log(id);
            const resp = yield database_1.default.query("UPDATE acceso set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    mostrar_todos_usuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM acceso');
            res.json(respuesta);
        });
    }
    buscar_usuario_or_id(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { UsuarioOrId } = req.params;
            try {
                const respuesta = yield database_1.default.query(`
                SELECT * FROM acceso
                WHERE id = ? OR usuario LIKE ?;
            `, [UsuarioOrId, `%${UsuarioOrId}%`]);
                if (respuesta.length > 0) {
                    res.json(respuesta); // Se encontraron resultados
                }
                else {
                    res.status(404).json({ mensaje: 'No se encontraron usuariosque coincidan con la búsqueda.' });
                }
            }
            catch (error) {
                console.error('Error al buscar usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor.' });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();
