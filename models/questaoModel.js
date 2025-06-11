const conexoes = require('../db/postgres')

class Questao {
    constructor(dados) {
        const { id = 0, enunciado } = dados //id, enunciado
        this.id = id;
        this.enunciado = enunciado;
    }
}

Questao.prototype.listaDeQuestoes = async function () {
    try {
        const resultado = await conexoes.query('SELECT * FROM questao ORDER BY id')
        console.log('MODELS OK')
        return resultado.rows;
    } catch (err) {
        console.log(`erro no model: ${err}`)
        throw err;
    }
}

Questao.prototype.criacaoDeQuestao = async function () {
    try {
        const resultado = await conexoes.query('INSERT INTO questao (enunciado) VALUES ($1) RETURNING id', [this.enunciado])
        return resultado.rows[0];
    } catch (err) {
        console.log(`erro no model: ${err}`)
        throw err;
    }
}

Questao.prototype.questaoSorteadaQuiz = async function () {
    try {
        let contagemDados = await conexoes.query('SELECT COUNT(*) FROM questao') // Está retornando uma lista rows com um objeto {} dentro.
        contagemDados = parseInt(contagemDados.rows[0].count)
        if (contagemDados >= 1) {
            let id_questaoSorteada = sorteio(contagemDados)
            id_questaoSorteada = parseInt(id_questaoSorteada)


        } else {
            throw new Error('Não há questões cadastradas.');
        }
    } catch (err) {
        console.log(`erro no model: ${err}`)
        throw err;
    }
}

Questao.prototype.questaoSelecionadaQuiz = async function (id_questao = null) {
    try {
        if (id_questao === null) {
            return Error('Numero nulo')
        }
        const enunciado = await conexoes.query('SELECT enunciado FROM questao WHERE id = ($1)', id_questao) 
    } catch (err) {
        console.log(`erro no model: ${err}`)
        throw err;
    }
}

//Delete da questão
Questao.prototype.deletarQuestao = async function () { 
    try {
        // Apaga alternativas primeiro (por causa da chave estrangeira)
        await conexoes.query('DELETE FROM alternativa WHERE id_questao = $1', [this.id]);
        
        // Depois apaga a questão
        await conexoes.query('DELETE FROM questao WHERE id = $1', [this.id]);
        
    } catch (err) {
        console.log(`erro no model: ${err}`);
        throw err;
    }
}





function sorteio(max) {
    return Math.floor(Math.random() * max) + 1;

}





module.exports = Questao;