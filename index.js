const path = require('path')
const { lerArquivos } = require('./funcoes')
const fn = require('./funcoes')

const caminhoDiretorio = path.join(__dirname, 'legendas')

const simbolos = [
    '.', '?', '=', ',', '"', '_', '<i>', '</i>',
    '-', '♪', '\r', '[', ']', '(', ')'
]

const mesclarElementos = array => array.join(' ')
const separarPorLinhas = todoConteudo => todoConteudo.split('\n')
const separarPorPalavras = todoConteudo => todoConteudo.split(' ')

fn.lerDiretorio(caminhoDiretorio)
    .then(caminhosArquivos => fn.filtraPorExtensão(caminhosArquivos, '.srt'))
    .then(caminhosArquivosSrt => lerArquivos(caminhosArquivosSrt))
    .then(mesclarElementos)
    .then(separarPorLinhas)
    .then(fn.removerSeVazio)
    .then(fn.removerSeIncluir('-->'))
    .then(fn.removerSeApenasNumeros)
    .then(fn.removerSimbolos(simbolos))
    .then(mesclarElementos)
    .then(separarPorPalavras)
    .then(console.log)
    

