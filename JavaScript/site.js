document.addEventListener("DOMContentLoaded", function () {

    /* 1. CARROSSEL - FUNCIONA COM SEU HTML ATUAL */
    const carrossel = document.querySelector(".carrossel");

    if (carrossel) {
        const faixa = carrossel.querySelector(".container-projetos");
        const anterior = carrossel.querySelector("#anterior");
        const proximo = carrossel.querySelector("#proximo");

        if (faixa && anterior && proximo) {
            const cards = Array.from(faixa.querySelectorAll(".quadrado1"));
            let posicao = 0;

            // Complementa os cards existentes, sem apagar as imagens do projeto.
            cards.forEach(function (card, indice) {
                const imagem = card.querySelector("img");
                const tituloExistente = card.querySelector("h3");

                if (!imagem && !card.querySelector(".projeto-em-breve")) {
                    const aviso = document.createElement("div");
                    aviso.className = "projeto-em-breve";
                    aviso.textContent = "Em breve";
                    card.prepend(aviso);
                }

                if (!tituloExistente) {
                    const titulo = document.createElement("h3");
                    titulo.textContent = indice === 0 ? "Studio Ana Ju"
                        : indice === 1 ? "Orcas Fatos"
                            : "Novo projeto em desenvolvimento";
                    card.append(titulo);
                }
            });

            function valores() {
                if (!cards.length) return null;
                const larguraCard = cards[0].getBoundingClientRect().width;
                const gap = parseFloat(getComputedStyle(faixa).columnGap) || 0;
                const larguraFaixa = faixa.clientWidth;
                const visiveis = Math.max(1,
                    Math.round((larguraFaixa + gap) / (larguraCard + gap)));
                const maximo = Math.max(0, cards.length - visiveis);
                return { larguraCard, gap, maximo };
            }


            /* ATUALIZA A POSIÇÃO DO CARROSSEL */

            function atualizar() {
                const v = valores();

                if (!v) return;

                // Garante que a posição seja válida
                posicao = Math.max(0, Math.min(posicao, v.maximo));

                // Calcula o deslocamento dos cards
                const deslocamento = posicao * (v.larguraCard + v.gap);

                // Movimenta o carrossel
                faixa.style.transform = `translateX(-${deslocamento}px)`;

                // Mantém as setas habilitadas para o ciclo
                anterior.disabled = (v.maximo === 0);
                proximo.disabled = (v.maximo === 0);
            }


            /* BOTÃO ANTERIOR */

            anterior.addEventListener("click", function () {
                const v = valores();

                if (!v || v.maximo === 0) return;

                // Se estiver no primeiro, vai para o último
                if (posicao === 0) {
                    posicao = v.maximo;
                } else {
                    posicao--;
                }

                atualizar();
            });


            /* BOTÃO PRÓXIMO */

            proximo.addEventListener("click", function () {
                const v = valores();

                if (!v || v.maximo === 0) return;

                // Se estiver no último, volta para o primeiro
                if (posicao === v.maximo) {
                    posicao = 0;
                } else {
                    posicao++;
                }

                atualizar();
            });

            window.addEventListener("resize", atualizar);
            atualizar();
        }
    }

    /* 2. MENU MOBILE - CRIA BOTAO AUTOMATICAMENTE */
    const cabecalho = document.querySelector(".cabecalho");
    const menu = cabecalho?.querySelector(".menu");

    if (cabecalho && menu) {
        if (!menu.id) menu.id = "menu-principal";

        const botaoMenu = document.createElement("button");
        botaoMenu.type = "button";
        botaoMenu.className = "menu-toggle";
        botaoMenu.textContent = "☰";
        botaoMenu.setAttribute("aria-label", "Abrir menu");
        botaoMenu.setAttribute("aria-controls", menu.id);
        botaoMenu.setAttribute("aria-expanded", "false");
        cabecalho.insertBefore(botaoMenu, menu);

        function fecharMenu() {
            cabecalho.classList.remove("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
            botaoMenu.textContent = "☰";
        }

        botaoMenu.addEventListener("click", function () {
            const aberto = cabecalho.classList.toggle("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", String(aberto));
            botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
            botaoMenu.textContent = aberto ? "✕" : "☰";
        });

        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", fecharMenu);
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 820) fecharMenu();
        });
    }


    /*FORMULÁRIO DEMONSTRATIVO */

    // Seleciona o formulário e a área de confirmação
    const form = document.getElementById("form-contato");
    const status = document.getElementById("status-contato");

    // Verifica se o formulário existe
    if (form) {

        // Executa ao clicar em Enviar mensagem
        form.addEventListener("submit", function (evento) {

            // Impede que a página recarregue
            evento.preventDefault();

            // Confere os campos obrigatórios
            if (!form.reportValidity()) {
                return;
            }

            // Pega o nome digitado pelo visitante
            const nome = form.elements.nome.value.trim();

            // Exibe a confirmação na página
            status.textContent =
                "Obrigado, " + nome +
                "! Mensagem registrada nesta demonstração.";

            // Limpa os campos do formulário
            form.reset();

        });

    }

}); 