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
    posicionarOpcoes(card);
}

const painelOpcoes = document.querySelector('.opcoes-categoria');
const gradeCategorias = document.querySelector('.ferramentas-grid');
const telaCompacta = window.matchMedia('(max-width: 1099px)');

function posicionarOpcoes(card) {
    if (!painelOpcoes || !gradeCategorias) return;
    if (telaCompacta.matches && card) {
        card.insertAdjacentElement('afterend', painelOpcoes);
    } else {
        gradeCategorias.insertAdjacentElement('afterend', painelOpcoes);
    }
}

telaCompacta.addEventListener('change', function () {
    posicionarOpcoes(document.querySelector('.categoria-card.selecionado') || cardsCategoria[0]);
});
posicionarOpcoes(cardsCategoria[0]);

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
        if (!reduzirMovimento && !document.body.classList.contains('sem-movimento')) {
            pararAutomatico();
            intervalo = window.setInterval(function () {
                mostrarSlide(indiceAtual + 1);
            }, 5000);
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
    document.addEventListener('preferencias-movimento', function () {
        pararAutomatico();
        iniciarAutomatico();
    });
}

const botaoTema = document.querySelector('.tema-botao');
const voltarTopo = document.querySelector('.voltar-topo');
if (voltarTopo) {
    function atualizarVoltarTopo() {
        const percurso = document.documentElement.scrollHeight - window.innerHeight;
        voltarTopo.hidden = percurso <= 0 || window.scrollY < percurso / 2;
    }
    window.addEventListener('scroll', atualizarVoltarTopo, { passive: true });
    window.addEventListener('resize', atualizarVoltarTopo);
    voltarTopo.addEventListener('click', function () {
        const semMovimento = document.body.classList.contains('sem-movimento') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: semMovimento ? 'instant' : 'smooth' });
        document.querySelector('.logo').setAttribute('tabindex', '-1');
        document.querySelector('.logo').focus({ preventScroll: true });
    });
    atualizarVoltarTopo();
}
const painelAcessibilidade = document.querySelector('.painel-acessibilidade');
document.addEventListener('click', function (evento) {
    if (painelAcessibilidade && !painelAcessibilidade.contains(evento.target)) {
        painelAcessibilidade.open = false;
    }
});
const preferencias = ['alto-contraste', 'reduzir-movimento', 'sublinhar-links'];
const classesPreferencias = ['alto-contraste', 'sem-movimento', 'links-sublinhados'];
const tamanhoTexto = document.querySelector('#tamanho-texto');
function atualizarAcessibilidade() {
    preferencias.forEach(function (id, i) {
        const controle = document.getElementById(id);
        document.body.classList.toggle(classesPreferencias[i], controle.checked);
        try { localStorage.setItem(id, String(controle.checked)); } catch (erro) {}
    });
    document.body.style.setProperty('--escala-texto', tamanhoTexto.value);
    try { localStorage.setItem('tamanho-texto', tamanhoTexto.value); } catch (erro) {}
    document.dispatchEvent(new Event('preferencias-movimento'));
}
preferencias.forEach(function (id) {
    const controle = document.getElementById(id);
    try { controle.checked = localStorage.getItem(id) === 'true'; } catch (erro) {}
    controle.addEventListener('change', atualizarAcessibilidade);
});
try { tamanhoTexto.value = localStorage.getItem('tamanho-texto') || '1'; } catch (erro) {}
tamanhoTexto.addEventListener('change', atualizarAcessibilidade);
atualizarAcessibilidade();
document.getElementById('restaurar-acessibilidade').addEventListener('click', function () {
    preferencias.forEach(function (id) { document.getElementById(id).checked = false; });
    tamanhoTexto.value = '1';
    atualizarAcessibilidade();
    if (document.body.dataset.tema === 'claro') botaoTema.click();
});

if (botaoTema) {
    const iconeTema = botaoTema.querySelector('.tema-icone');
    const textoTema = botaoTema.querySelector('.tema-texto');

    function aplicarTema(tema) {
        const temaClaro = tema === 'claro';
        document.body.dataset.tema = temaClaro ? 'claro' : 'escuro';
        botaoTema.setAttribute('aria-pressed', String(temaClaro));
        botaoTema.setAttribute('aria-label', temaClaro ? 'Ativar tema escuro' : 'Ativar tema claro');
        iconeTema.textContent = temaClaro ? '☾' : '☀';
        textoTema.textContent = temaClaro ? 'Escuro' : 'Claro';
        localStorage.setItem('tema-portalia', temaClaro ? 'claro' : 'escuro');
    }

    const temaSalvo = localStorage.getItem('tema-portalia');
    aplicarTema(temaSalvo === 'claro' ? 'claro' : 'escuro');

    botaoTema.addEventListener('click', function () {
        aplicarTema(document.body.dataset.tema === 'claro' ? 'escuro' : 'claro');
    });
}
