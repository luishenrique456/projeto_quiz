const conexoes = require('../db/postgres')

class Delete {
    constructor(id_questao) {
        this.id = id_questao;
    }

    async deletarQuestao() {
        // Apaga alternativas primeiro (por causa da chave estrangeira)
        await conexoes.query('DELETE FROM alternativa WHERE id_questao = $1', [this.id]);

        // Depois apaga a questão
        await conexoes.query('DELETE FROM questao WHERE id = $1', [this.id]);
    }
}


module.exports = Delete;