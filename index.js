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

function agruparPalavras(palavras){
    return Object.values(palavras.reduce((acc, palavra) => {
        const pAtual = palavra.toLowerCase()
        const qtde = acc[pAtual] ? acc[pAtual].qtde + 1 : 1

        acc[pAtual] = {elemento: pAtual, qtde}
        return acc
    }, {}))
}

function ordernarPorAtributoNumerico(attr, ordem ='asc'){
    return function (array){
        const asc = (el1, el2) => el1[attr] - el2[attr]
        const desc = (o1, o2) => o2[attr] - o1[attr]

        return array.sort(ordem ==='asc' ? asc : desc)
    }
}

fn.lerDiretorio(caminhoDiretorio)
    .then(caminhosArquivos => fn.filtraPorExtensão(caminhosArquivos, '.srt'))
    .then(caminhosArquivosSrt => lerArquivos(caminhosArquivosSrt))
    .then(mesclarElementos)
    .then(separarPorLinhas)
    .then(fn.removerSeVazio)
    .then(fn.removerSeIncluir('-->'))
    .then(fn.removerSimbolos(simbolos))
    .then(mesclarElementos)
    .then(separarPorPalavras)
    .then(fn.removerSeApenasNumeros)
    .then(agruparPalavras)
    .then(ordernarPorAtributoNumerico('qtde'))
    .then(console.log)
    

