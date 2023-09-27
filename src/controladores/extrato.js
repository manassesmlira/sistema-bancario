
let { contas, transferencias, depositos, saques } = require('../bancodedados')


const emitirExtrato = (req, res) => {
    try {
        const { numero_conta, senha } = req.query

        if (!numero_conta || !senha) {
            return res.status(404).json({ mensagem: "Senha ou o numero da conta não informado(s)" })
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

        const deposito = depositos.filter((deposito) => deposito.numero_conta === numero_conta)
        const saque = saques.filter((saque) => saque.numero_conta === numero_conta)

        const transferenciasEnviadas = transferencias.filter((transferencia) => transferencia.numero_conta_origem === numero_conta)
        const transferenciasRecebidas = transferencias.filter((transferencia) => transferencia.numero_conta_destino === numero_conta)

        return res.json({
            depositos: deposito,
            saques: saque,
            transferenciasEnviadas,
            transferenciasRecebidas

        })
    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }

}


module.exports = emitirExtrato