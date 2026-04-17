import { Router } from 'express';
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PermissionController from './controllers/PermissionController';
import RoleController from './controllers/RoleController';

import { is } from './middlewares/permission';
import DepartamentoController from './controllers/DepartamentoController';
import EtapaController from './controllers/EtapaController';
import PedidoController from './controllers/PedidoController';
import EtapaPedidoController from './controllers/EtapaPedido.Controller';
import ClienteController from './controllers/ClienteController';
import EnderecoController from './controllers/EnderecoController';
import UserFilesController from './controllers/UserFilesController';
const uploadPdf = require('./Services/UploadPdf');

const router = Router();
//router.post("/users", is(['Admin_Role', 'User_Role' , 'Rh_Role']), UserController.create);
router.post("/users", is(['Admin_Role', 'User_Role', 'Rh_Role']), UserController.create);
router.post("/sessions", SessionController.create);
router.post("/permissions", is(['Admin_Role', 'User_Role', 'Rh_Role']), PermissionController.create);
router.post("/roles", is(['Admin_Role', 'User_Role', 'Rh_Role']), RoleController.create);
/* router.post("/departamentos", DepartamentoController.create); */
router.post("/etapas", is(['Admin_Role', 'User_Role', 'Rh_Role']), EtapaController.create);
router.post("/pedidos", is(['Admin_Role', 'User_Role', 'Rh_Role']), PedidoController.create);
router.post("/etapapedido", is(['Admin_Role', 'User_Role', 'Rh_Role']), EtapaPedidoController.create);
router.post('/upload', is(['Admin_Role', 'User_Role', 'Rh_Role']), uploadPdf.single('pdf'), UserFilesController.create);

router.get("/arquivos", is(['Admin_Role', 'User_Role', 'Rh_Role']), UserFilesController.getAll);
router.get("/users", is(['Admin_Role', 'Rh_Role']), UserController.getAll);
router.get("/usersid/:id", is(['Admin_Role', 'User_Role', 'Rh_Role']), UserController.getById);
router.get("/pedidos", is(['Admin_Role', 'User_Role', 'Rh_Role']), PedidoController.getAll);
router.get("/pedidos/:id", is(['Admin_Role', 'User_Role', 'Rh_Role']), PedidoController.getById);
router.put("/pedidos/:id", is(['Admin_Role', 'User_Role', 'Rh_Role']), PedidoController.update);
router.get("/etapas", is(['Admin_Role', 'User_Role', 'Rh_Role']), EtapaController.getAll);
router.get("/departamentos", is(['Admin_Role', 'User_Role', 'Rh_Role']), DepartamentoController.getAll);
router.get("/etapapedido", is(['Admin_Role', 'User_Role', 'Rh_Role']), EtapaPedidoController.getAll);
router.get('/etapapedido/pedido/:pedidoId', is(['Admin_Role', 'User_Role', 'Rh_Role']), EtapaPedidoController.getByPedidoId);

router.get("/pedidosDashboard", is(['Admin_Role', 'User_Role', 'Rh_Role']), PedidoController.getAll);
router.get("/clientesDashboard", is(['Admin_Role', 'User_Role', 'Rh_Role']), ClienteController.list);
router.get("/RhDashboard", is(['Admin_Role', 'User_Role', 'Rh_Role']), PedidoController.getTurnoverByClient);


router.put("/etapas/:id", is(['Admin_Role', 'User_Role', 'Rh_Role']), EtapaController.update);
router.put('/etapapedido/:id', is(['Admin_Role', 'User_Role', 'Rh_Role']), EtapaPedidoController.update);

router.delete("/etapas/:id", is(['Admin_Role', 'User_Role', 'Rh_Role']), EtapaController.delete);


router.get("/users/roles", is(['Admin_Role', 'User_Role', 'Rh_Role']), UserController.roles);
router.put("/updatePassword", is(['Admin_Role', 'User_Role', 'Rh_Role']), UserController.updatePassword);

router.post("/clientes", is(['Admin_Role', 'User_Role', 'Rh_Role']), ClienteController.create); // Cadastrar cliente
router.get("/clientes", is(['Admin_Role', 'User_Role', 'Rh_Role']), ClienteController.list); // Listar clientes
router.get("/clientes/:id", is(['Admin_Role', 'User_Role', 'Rh_Role']), ClienteController.getClienteById); // Buscar cliente por ID
router.put("/clientes/:id", is(['Admin_Role', 'User_Role', 'Rh_Role']), ClienteController.update); // Atualizar cliente
router.delete("/clientes/:id", is(['Admin_Role', 'User_Role', 'Rh_Role']), ClienteController.delete); // Deletar cliente
router.delete('/arquivos/:id', is(['Admin_Role', 'User_Role', 'Rh_Role']), UserFilesController.delete);

// Rotas de Endereços
router.post('/clientes/:id/enderecos', is(['Admin_Role', 'User_Role', 'Rh_Role']), EnderecoController.create); // Adiciona endereço para cliente
router.get('/clientes/:id/enderecos', is(['Admin_Role', 'User_Role', 'Rh_Role']), EnderecoController.getByClienteId); // Lista endereços de um cliente
router.put('/clientes/:clienteId/enderecos/:enderecoId', is(['Admin_Role', 'User_Role', 'Rh_Role']), EnderecoController.update);
router.delete('/clientes/:id/enderecos', is(['Admin_Role', 'User_Role', 'Rh_Role']), EnderecoController.delete); // Excluir endereço

export { router };