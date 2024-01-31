"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const platilloRouter_1 = __importDefault(require("./routes/platilloRouter")); //puede cambiar el nombre de la variable, pero por estructura llamarlo como el archivo importado
const bebidaRouter_1 = __importDefault(require("./routes/bebidaRouter"));
const meseroRouter_1 = __importDefault(require("./routes/meseroRouter"));
const mesaRouter_1 = __importDefault(require("./routes/mesaRouter"));
const pedidoRouter_1 = __importDefault(require("./routes/pedidoRouter"));
const detallePedidoRouter_1 = __importDefault(require("./routes/detallePedidoRouter"));
const carritoRouter_1 = __importDefault(require("./routes/carritoRouter"));
const carritoBarRouter_1 = __importDefault(require("./routes/carritoBarRouter"));
const carritoCocinaRouter_1 = __importDefault(require("./routes/carritoCocinaRouter"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const usuarioRouter_1 = __importDefault(require("./routes/usuarioRouter"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
    }
    config() {
        this.app.set('port', process.env.PORT || 80); //aqui podemos modificar el puerto, el puerto nos lo dara el provedodr de hosting
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/platillo', platilloRouter_1.default);
        this.app.use('/api/bebida', bebidaRouter_1.default);
        this.app.use('/api/mesero', meseroRouter_1.default);
        this.app.use('/api/mesa', mesaRouter_1.default);
        this.app.use('/api/pedido', pedidoRouter_1.default);
        this.app.use('/api/detallePedido', detallePedidoRouter_1.default);
        this.app.use('/api/carrito', carritoRouter_1.default);
        this.app.use('/api/carritoCocina', carritoCocinaRouter_1.default);
        this.app.use('/api/carritoBar', carritoBarRouter_1.default);
        this.app.use('/api/acceso', usuarioRouter_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor montado en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
