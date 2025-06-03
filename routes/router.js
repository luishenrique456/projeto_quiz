const express = require('express')
const router = express.Router()

// PAGINA INICIAL
router.get('/', (req, res) => {
    res.render('pages/pageInicio');
})

// LISTAR QUESTÕES

const mostrarQuestoesController = require('../controllers/controller')

router.get('/listarQuestoes', async (req, res) => {
    try{
        const questoes = await mostrarQuestoesController.mostrarQuestoes();
        res.render('pages/listarQuestoes', { questoes })
        console.log('ROUTER OK')
        console.log(questoes)
    } catch (err) {
        console.log('Conexão falhou');
        res.status(500).send('Erro ao listar questões');
    }
    
})


module.exports = router;