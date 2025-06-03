const conexoes = require('../db/postgres')

async function listaDeQuestoes() {
    try {
        const resultado = await conexoes.query('SELECT * FROM questao ORDER BY id')
        console.log('MODELS OK')
        return resultado.rows;
    } catch (err) {
        console.log(`erro no model: ${err}`)
        throw err;
    }
}

module.exports = { listaDeQuestoes };