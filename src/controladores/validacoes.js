
let { contas } = require('../bancodedados');

function validarConta(numConta) {
 return contas.find((conta) => conta.numero === numConta)        
}

function date() {
    const fusoSP = new Date().setUTCHours(-4) 
    const date = new Date(fusoSP).toISOString().replace('T', " ").slice(0, 19)
    return date
}

function validaCpf (cpf) {
    return contas.find((conta)=> conta.usuario.cpf === cpf)
}
function validaEmail (email) {
    return contas.find((conta)=> conta.usuario.email === email)
}



module.exports = {
date,
validarConta,
validaCpf,
validaEmail

}


