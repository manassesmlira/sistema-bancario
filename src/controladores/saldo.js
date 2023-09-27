
let { contas } = require('../bancodedados')
const { validarConta } = require('./validacoes')


const saldoConta = (req, res) => {
    try {
        const { numero_conta, senha } = req.query

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

        const indiceConta = contas.findIndex((atual) => {
            return atual.numero === numero_conta
        })
        if (indiceConta === -1) {
            return res.status(404).json({ mensagem: "conta não encontrada" })
        }

        if (senha !== contas[indiceConta].usuario.senha) {
            return res.status(400).json({ mensagem: "Senha incorreta" })
        }

        let saldoConta = contas[indiceConta].saldo
        return res.status(200).json({ saldo: saldoConta })
    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }


}


module.exports = saldoConta