const questaoModels = require('../models/quizModel');

async function mostrarQuestoes() {
    try {
        const questoes = await questaoModels.listaDeQuestoes();
        console.log('CONTROLLER OK')
        return questoes
    } catch (err) {
        console.log('Erro ao listar questões')
        res.send(500).send('Erro ao listar Questões')
    }
}

module.exports = { mostrarQuestoes }