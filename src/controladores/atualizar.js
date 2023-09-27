
const { validaCpf, validarConta, validaEmail } = require('./validacoes')

const atualizarConta = (req, res) => {
    try {
        const { numeroConta } = req.params
        let { nome, cpf, data_nascimento, telefone, email, senha } = req.body

        const conta = validarConta(numeroConta)

        if (!conta) {
            return res.status(404).json({ mensagem: "A conta informada não existe" })
        }

        if (nome || cpf || data_nascimento || telefone || email || senha) {

            if (nome) { conta.usuario.nome = nome }
            if (data_nascimento) { conta.usuario.data_nascimento = data_nascimento }
            if (telefone) { conta.usuario.telefone = telefone }
            if (senha) { conta.usuario.senha = senha }

            if (cpf) {
                let cpfEncontrado = validaCpf(cpf)
                if (cpfEncontrado === true) {
                    return res.status(409).json({ mensagem: 'Já existe um cadastro com este CPF' })
                }
                conta.usuario.cpf = cpf
            }

            let emailEncontrado = validaEmail(email)
            if (emailEncontrado === true) {
                return res.status(409).json({ mensagem: 'Já existe um cadastro com este EMAIL' })
            }
            conta.usuario.email = email

        } else {
            return res.status(404).json({ mensagem: "Favor preencher pelo menos 1 campo." })
        }

        return res.status(200).json({ mensagem: "Conta Atualizada com sucesso!" })

    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }
}


module.exports = atualizarConta