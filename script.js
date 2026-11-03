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

const carrosselCuidados = document.querySelector('.carrossel-cuidados');

if (carrosselCuidados) {
    const faixa = carrosselCuidados.querySelector('.carrossel-faixa');
    const slides = carrosselCuidados.querySelectorAll('.slide-cuidado');
    const botaoAnterior = carrosselCuidados.querySelector('.anterior');
    const botaoProximo = carrosselCuidados.querySelector('.proximo');
    const controles = carrosselCuidados.querySelector('.carrossel-controles');
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let indiceAtual = 0;
    let intervalo;

    slides.forEach(function (slide, indice) {
        const indicador = document.createElement('button');
        indicador.className = 'indicador-carrossel';
        indicador.type = 'button';
        indicador.setAttribute('aria-label', 'Ver orientação ' + (indice + 1));
        indicador.addEventListener('click', function () {
            mostrarSlide(indice);
            reiniciarAutomatico();
        });
        controles.appendChild(indicador);
    });

    const indicadores = controles.querySelectorAll('.indicador-carrossel');

    function mostrarSlide(indice) {
        indiceAtual = (indice + slides.length) % slides.length;
        faixa.style.transform = 'translateX(-' + (indiceAtual * 100) + '%)';

        slides.forEach(function (slide, posicao) {
            const estaAtivo = posicao === indiceAtual;
            slide.setAttribute('aria-hidden', String(!estaAtivo));
            indicadores[posicao].classList.toggle('ativo', estaAtivo);
            indicadores[posicao].setAttribute('aria-current', estaAtivo ? 'true' : 'false');
        });
    }

    function pararAutomatico() {
        window.clearInterval(intervalo);
    }

    function iniciarAutomatico() {
        if (!reduzirMovimento) {
            pararAutomatico();
            intervalo = window.setInterval(function () {
                mostrarSlide(indiceAtual + 1);
            }, 3000);
        }
    }

    function reiniciarAutomatico() {
        iniciarAutomatico();
    }

    botaoAnterior.addEventListener('click', function () {
        mostrarSlide(indiceAtual - 1);
        reiniciarAutomatico();
    });

    botaoProximo.addEventListener('click', function () {
        mostrarSlide(indiceAtual + 1);
        reiniciarAutomatico();
    });

    carrosselCuidados.addEventListener('mouseenter', pararAutomatico);
    carrosselCuidados.addEventListener('mouseleave', iniciarAutomatico);
    carrosselCuidados.addEventListener('focusin', pararAutomatico);
    carrosselCuidados.addEventListener('focusout', function () {
        window.setTimeout(function () {
            if (!carrosselCuidados.contains(document.activeElement)) {
                iniciarAutomatico();
            }
        }, 0);
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            pararAutomatico();
        } else {
            iniciarAutomatico();
        }
    });

    mostrarSlide(0);
    iniciarAutomatico();
}


