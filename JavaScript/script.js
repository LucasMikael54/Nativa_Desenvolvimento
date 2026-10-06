let btnProximo = document.getElementById("próximo");
let btnAnterior = document.getElementById("anterior");
let quadrados = document.querySelector("quadrado1");

let atual = 0;

btnProximo = addEventListener("click", mostrarProximo);
btnAnterior = addEventListener("click", mostrarAnterior);

function mostrarProximo(){
    quadrados[atual].classlist.remove("ativo");

    atual = atual + 1
}