let btnProximo = document.getElementById("proximo");
let btnAnterior = document.getElementById("anterior");
let quadrados = document.querySelectorAll(".quadrado");

let atual = 0;

btnProximo = addEventListener("click", mostrarProximo);
btnAnterior = addEventListener("click", mostrarAnterior);

function mostrarProximo(){
    quadrados[atual].classList.remove("ativo");

    atual = atual + 1

    if(atual >= quadrados.length){
        atual = 0;
    }

    quadrados[atual].classlist.add("ativo");
}

function mostrarAnterior(){
    quadrados[atual].classlist.remove("ativo");

    atual = atual + 1

    if(atual < 0){
        atual = quadrados.length - 1;
    }

    quadrados[atual].classlist.add("ativo");
}