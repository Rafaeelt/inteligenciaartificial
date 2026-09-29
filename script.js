const botoesFiltro = document.querySelectorAll('.filtro');
const cardsFerramenta = document.querySelectorAll('.ferramenta');

botoesFiltro.forEach(function (botao) {
    botao.addEventListener('click', function () {
        const categoriaEscolhida = botao.getAttribute('data-categoria');

        botoesFiltro.forEach(function (outroBotao) {
            outroBotao.classList.remove('ativo');
        });

        botao.classList.add('ativo');

        cardsFerramenta.forEach(function (card) {
            const categoriaDoCard = card.getAttribute('data-categoria');

            if (categoriaEscolhida === 'todas' || categoriaEscolhida === categoriaDoCard) {
                card.classList.remove('esconder');
            } else {
                card.classList.add('esconder');
            }
        });
    });
});


const cardsCategoria = document.querySelectorAll('.categoria-card');
const opcoesCategoria = document.querySelectorAll('.opcoes-lista');
const mensagemCategoria = document.querySelector('.mensagem-categoria');

function mostrarCategoria(card) {
    const categoria = card.getAttribute('data-categoria');
    cardsCategoria.forEach(function (outroCard) {
        outroCard.classList.toggle('selecionado', outroCard === card);
    });
    opcoesCategoria.forEach(function (opcoes) {
        opcoes.classList.toggle('visivel', opcoes.getAttribute('data-opcoes') === categoria);
    });
}

cardsCategoria.forEach(function (card) {
    card.addEventListener('click', function () {
        mostrarCategoria(card);
    });
    card.addEventListener('keydown', function (evento) {
        if (evento.key === 'Enter' || evento.key === ' ') {
            evento.preventDefault();
            mostrarCategoria(card);
        }
    });
});

window.mostrarCategoria = mostrarCategoria;
