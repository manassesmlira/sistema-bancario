
let { contas, transferencias } = require('../bancodedados')
const { date, validarConta } = require('./validacoes');

const transferir = (req, res) => {
    try {
        const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

        if (isNaN(Number(numero_conta_origem)) || isNaN(Number(numero_conta_destino))) {
            return res.status(400).json({ mensagem: "por favor, insira um número de conta válido" })
        }

        const contaOrigem = validarConta(numero_conta_origem)
        const contaDestino = validarConta(numero_conta_destino)

        if (!contaOrigem) {
            return res.status(404).json({ mensagem: "Conta origem não encontrada" })
        }
        if (!contaDestino) {
            return res.status(404).json({ mensagem: "Conta destino não encontrada" })
        }

        if (!valor || valor <= 0 || isNaN(valor)) {
            return res.status(400).json({ mensagem: "O valor é somente números e precisa ser maior que zero." })
        }

        const indiceContaOrigem = contas.findIndex((conta) => {
            return conta.numero === numero_conta_origem
        })
        
        if (indiceContaOrigem === -1) {
            return res.status(404).json({ mensagem: "conta não encontrada" })
        }
        const indiceContaDestino = contas.findIndex((atual) => {
            return atual.numero === numero_conta_destino
        })
        if (indiceContaDestino === -1) {
            return res.status(404).json({ mensagem: "conta não encontrada" })
        }
        if (Number(valor) > contas[indiceContaOrigem].saldo) {
            return res.status(400).json({ mensagem: "Saldo insuficiente." })
        }

        if (senha !== contas[indiceContaOrigem].usuario.senha) {
            return res.status(400).json({ mensagem: "Senha incorreta" })
        }
        contas[indiceContaOrigem].saldo -= Number(valor)
        contas[indiceContaDestino].saldo += Number(valor)

        transferencias.push({
            data: date(),
            numero_conta_origem,
            numero_conta_destino,
            valor
        })

        return res.status(201).json({ mensagem: "Trasnferência realizada com sucesso" })

    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }
}

module.exports = transferir