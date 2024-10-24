import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";
import Pedido from "../models/Pedido";
import { format } from "date-fns";
/* import Users from "../models/Users"; 
import Clientes from "../models/Clientes";  */

class PedidoController {
    // Criar um novo pedido
    async create(req: Request, res: Response): Promise<Response> {
        const {
            nome,
            descricao,
            data_criacao,
            data_entrega,
            estado,
            categoria,
            tipo,
            peso,
            quantidade,
            volume,
            distancia,
        } = req.body;

        const pedidoRepository = AppDataSource.getRepository(Pedido);

        try {

            // Criar um novo pedido com os IDs de usuário e cliente
            const pedido = pedidoRepository.create({
                nome,
                descricao,
                data_criacao,
                data_entrega,
                estado,
                categoria,
                tipo,
                peso,
                quantidade,
                volume,
                distancia,
            });

            // Salvar o pedido no banco de dados
            await pedidoRepository.save(pedido);

            return res.status(201).json(pedido);
        } catch (error) {
            return res.status(500).json({ message: "Erro ao criar pedido", error });
        }
    }

    // Buscar todos os pedidos
    async getAll(req: Request, res: Response): Promise<Response> {
        const pedidoRepository = AppDataSource.getRepository(Pedido);
        
        // Busca todos os pedidos
        const pedidos = await pedidoRepository.find();

        // Formata a data de criação de cada pedido
        const pedidosFormatados = pedidos.map(pedido => ({
            ...pedido,
            data_criacao: format(new Date(pedido.data_criacao), 'dd/MM/yyyy'), // Formata a data como 'dd/MM/yyyy'
            data_entrega: format(new Date(pedido.data_entrega), 'dd/MM/yyyy'), // Se precisar formatar a data de entrega também
        }));

        // Retorna os pedidos com a data formatada
        return res.status(200).json(pedidosFormatados);
    }

    // Buscar um pedido por ID
    async getById(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const pedidoRepository = AppDataSource.getRepository(Pedido);

        try {
            // Busca o pedido junto com as relações (user e cliente)
            const pedido = await pedidoRepository.findOne({
                where: { id: Number(id) },
                relations: ["user", "cliente"], // Incluindo as relações que você precisa
            });

            if (!pedido) {
                return res.status(404).json({ message: "Pedido não encontrado" });
            }

            return res.status(200).json(pedido);
        } catch (error) {
            console.error("Erro ao buscar o pedido por ID:", error);
            return res.status(500).json({ message: "Erro ao buscar pedido", error });
        }
    }
}

export default new PedidoController();
