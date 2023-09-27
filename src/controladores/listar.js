
let { contas } = require('../bancodedados')

const listarContas = (req, res) => {
    try {
        if (contas.length === 0) {
            return res.status(404).json({ mensagem: "Nenhuma conta encontrada" })
        }

        let qtd = contas.length
        return res.status(200).json({
            mensagem: `${qtd} conta(s) encontrada(s):`,
            contas
        })
    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }

}


module.exports = listarContas