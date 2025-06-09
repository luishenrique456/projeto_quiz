const conexoes = require('../db/postgres')

class Alternativa {
    constructor(dados) {
        const { id_questao, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, alternativaCorreta } = dados //id_questao, alternativaA, alternativaB, alternativaC, alternativaD, alternativaE, correta 
        this.id_questao = id_questao;
        this.alternativaA = alternativaA // Guarda o enunciado da questão
        this.alternativaB = alternativaB // Guarda o enunciado da questão
        this.alternativaC = alternativaC // Guarda o enunciado da questão
        this.alternativaD = alternativaD // Guarda o enunciado da questão
        this.alternativaE = alternativaE // Guarda o enunciado da questão
        this.corretaBool = alternativaCorreta // Guarda a questão correta
    }
}

Alternativa.prototype.criacaoDeAlternativas = async function () {
    const listaAlternativas = [
        this.alternativaA,
        this.alternativaB,
        this.alternativaC,
        this.alternativaD,
        this.alternativaE
    ]


    try {

        for (let i = 0; i < listaAlternativas.length; i++) {

            const letra = mapeamentoIndiceLetra(i)
            let correta = false

            if (letra === this.corretaBool) {
                correta = true
            }
            await conexoes.query(
                'INSERT INTO alternativa (texto_resposta, correta, id_questao) VALUES ($1, $2, $3)',
                [listaAlternativas[i], correta, this.id_questao]

            );
        }
    } catch (err) {
        // await conexoes.query('DELETE FROM alternativa WHERE id_questao = $1', [this.id_questao]);
        console.log('nada foi adicionado na tabela');
        throw err;
    }
};

function mapeamentoIndiceLetra (indice) {
    if (indice === 0) {
        return 'a'
    } else {
        if (indice === 1) {
            return 'b'
        } else {
            if (indice === 2) {
                return 'c'
            } else {
                if (indice === 3) {
                    return 'd'
                } else {
                    if (indice === 4){
                        return 'e'
                    } else {
                        return null
                    }
                }
            }
        }
    }
}


module.exports = Alternativa;