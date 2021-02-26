const fs = require('fs')
const path = require('path')

function filtraPorExtensão(arrayArquivos, extensao){
    return arrayArquivos.filter(caminhoArquivo => caminhoArquivo.endsWith(extensao))
}

function lerDiretorio(caminho){
    return new Promise((resolve, reject) => {
        try {
            let arquivos = fs.readdirSync(caminho)
            arquivos = arquivos.map(arquivo => path.join(caminho, arquivo))
            resolve(arquivos)
            
        } catch (error) {
            reject(error)
        }
    })
}

function lerArquivo(caminhoArquivo){
    return new Promise((resolve, reject) => {
        try {
            const conteudoArquivo = fs.readFileSync(caminhoArquivo, { encoding: 'utf-8' })
            resolve(conteudoArquivo.toString())
        } catch (error) {
            reject(error)
        }
    })
}

function lerArquivos(caminhosArquivos){
    return Promise.all(caminhosArquivos.map(caminho => lerArquivo(caminho)))
}

function removerSeVazio(array){
    return array.filter(elem => elem.trim())
}

function removerSeIncluir(padraoTextual){
    return function(array){
        return array.filter(elem => !elem.includes(padraoTextual))
    }
}

function removerSeApenasNumeros(array){
    return array.filter(elem => {
        const num = parseInt(elem.trim())
        return num !== num // Só dará true quando a constante 'num' for um NaN.
        // return !(num != 0 && !!num) -> outra opção
    })
}

function removerSimbolos(simbolos){
    return function(array){
        return array.map(elem => {
            let linha = elem
            simbolos.forEach(simbolo => {
                linha = linha.split(simbolo).join('')
            })
            return linha
        })
    }
}

module.exports = {
    lerDiretorio,
    lerArquivos,
    filtraPorExtensão,
    removerSeVazio,
    removerSeIncluir,
    removerSeApenasNumeros,
    removerSimbolos
}