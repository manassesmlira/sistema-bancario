
let { contas } = require('../bancodedados')


const excluirConta = (req, res) => {
    try {
        const { numeroConta } = req.params

        const indiceConta = contas.findIndex((conta) => {
            return conta.numero === numeroConta
        })
        if (indiceConta === -1) {
            return res.status(404).json({ mensagem: "conta não encontrada" })
        }

        if (contas[indiceConta].saldo > 0) {
            return res.status(400).json({ mensagem: "A conta possui saldo, por isso não pode ser excluída." })
        }

        contas.splice(indiceConta, 1)

        return res.status(200).json({ mensagem: "Conta excluída com sucesso!" })
    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }
}


module.exports = excluirConta