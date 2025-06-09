const express = require('express')
const router = express.Router()

// PAGINA INICIAL
router.get('/', (req, res) => {
    res.render('pages/pageInicio');
})

// LISTAR QUESTÕES

const QuizController = require('../controllers/controller')

router.get('/listarQuestoes', async (req, res) => {
    try {
        const questoes = await QuizController.mostrarQuestoes();
        res.render('pages/listarQuestoes', {
            questoes,
            title: 'Questões'
        })
    } catch (err){
        res.status(500).send('Busca mal-sucedida')
    }
    
})


router.get('/AdicionarQuestao', (req, res) => {
    res.render('pages/criarQuestao')
})

router.post('/criarQuestao', async (req,res) => {
    await QuizController.criacaoQuestao(req, res)
    res.redirect('/listarQuestoes')
})

router.get('/apagarQuestao', (req, res) => {
    res.render('pages/apaga_questao');
});

router.post('/apagarQuestao', async (req, res) => {
    try {
        await QuizController.deletarQuestao(req, res);
        res.redirect('/listarQuestoes');
    } catch (err) {
        res.status(500).send('Erro ao apagar a questão');
    }
});





module.exports = router;