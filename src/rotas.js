const express = require('express');

const intermediario = require('./intermediarios');

const atualizar = require('./controladores/atualizar');
const listar = require('./controladores/listar');
const criar = require('./controladores/criar');
const depositar = require('./controladores/depositar');
const excluir = require('./controladores/excluir')
const sacar = require('./controladores/sacar')
const transferir = require('./controladores/transferir')
const saldo = require('./controladores/saldo')
const extrato = require('./controladores/extrato')

const rotas = express();

rotas.use(intermediario)

rotas.get('/contas', listar)
rotas.post('/contas', criar)
rotas.put('/contas/:numeroConta/usuario', atualizar)
rotas.delete('/contas/:numeroConta', excluir)
rotas.post('/transacoes/depositar', depositar)
rotas.post('/transacoes/sacar', sacar)
rotas.post('/transacoes/transferir', transferir)
rotas.get('/contas/saldo', saldo)
rotas.get('/contas/extrato', extrato)


module.exports = rotas