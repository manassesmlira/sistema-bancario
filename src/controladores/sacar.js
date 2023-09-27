
let { contas, saques } = require('../bancodedados')
const { date, validarConta } = require('./validacoes')


const sacarConta = (req, res) => {
    try {
        const { numero_conta, valor, senha } = req.body

        if (isNaN(Number(numero_conta))) {
            return res.status(400).json({ mensagem: "por favor, insira um número de conta válido" })
        }

        const conta = validarConta(numero_conta)

        if (!conta) {
            return res.status(404).json({ mensagem: "conta não encontrada" })
        }

        if (!senha) {
            return res.status(404).json({ mensagem: "Por favor, digite a senha" })
        }

        if (!valor || valor <= 0 || isNaN(valor)) {
            return res.status(400).json({ mensagem: "O valor é somente números e precisa ser maior que zero." })
        }

        const indiceConta = contas.findIndex((atual) => {
            return atual.numero === numero_conta
        })
        if (indiceConta === -1) {
            return res.status(404).json({ mensagem: "conta não encontrada" })
        }
        if (Number(valor) > contas[indiceConta].saldo) {
            return res.status(400).json({ mensagem: "Saldo insuficiente." })
        }

        if (senha !== contas[indiceConta].usuario.senha) {
            return res.status(400).json({ mensagem: "Senha incorreta" })
        }

        contas[indiceConta].saldo -= Number(valor)

        const transacao = {
            data: date(),
            numero_conta,
            valor
        }
        saques.push(transacao)

        return res.status(201).json(transacao)
    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }
}

module.exports = sacarConta