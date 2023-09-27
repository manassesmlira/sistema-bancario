
let { contas, depositos } = require('../bancodedados')
const { date, validarConta } = require('./validacoes')


const depositarConta = (req, res) => {
    try {
        const { numero_conta, valor } = req.body

        if (isNaN(Number(numero_conta))) {
            return res.status(400).json({ mensagem: "por favor, insira um número de conta válido" })
        }

        const conta = validarConta(numero_conta)

        if (!conta) {
            return res.status(404).json({ mensagem: "conta não encontrada" })
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

        contas[indiceConta].saldo += Number(valor)

        const transacao = {
            data: date(),
            numero_conta,
            valor
        }

        depositos.push(transacao)
        return res.status(200).json({ mensagem: "Depósito realizado com sucesso" })

    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }

}

module.exports = depositarConta