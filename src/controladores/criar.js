
let { contas } = require('../bancodedados')


const criarConta = (req, res) => {
    try {
        const { nome, cpf, data_nascimento, telefone, email, senha } = req.body

        if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
            return res.status(400).json({ mensagem: 'Preencha todas as informações. Campos marcados com * são obrigatórios.' })
        }

        if (isNaN(Number(cpf))) {
            return res.status(400).json({ mensagem: 'O CPF deve conter somente números.' })
        }
        if (cpf.length !== 11) {
            return res.status(409).json({ mensagem: 'O CPF precisa conter exatos 11 dígitos' })
        }
        if (isNaN(Number(telefone))) {
            return res.status(400).json({ mensagem: 'O TELEFONE deve conter somente números.' })
        }

        let cpfEncontrado = false
        let emailEncontrado = false
        for (let i = 0; i < contas.length; i++) {
            if (contas[i].usuario.cpf === cpf) {
                cpfEncontrado = true
                break
            }
        }
        for (let i = 0; i < contas.length; i++) {
            if (contas[i].usuario.email === email) {
                emailEncontrado = true
                break
            }
        }

        if (cpfEncontrado === true) {
            return res.status(409).json({ mensagem: 'Já existe um cadastro com este CPF' })
        }
        if (emailEncontrado === true) {
            return res.status(409).json({ mensagem: 'Já existe um cadastro com este EMAIL' })
        }

        let numNovaConta = contas.length + 1
        const novoCliente = {
            numero: numNovaConta.toString(),
            saldo: 0,
            usuario: {
                nome,
                cpf,
                data_nascimento,
                telefone,
                email,
                senha
            }
        }
        contas.push(novoCliente)

        return res.status(201).json({
            mensagem: "Conta criada com sucesso!",
            novoCliente
        })
    } catch (error) {
        return res.status(500).json(`mensagem: ${error.message}`);
    }

}


module.exports = criarConta