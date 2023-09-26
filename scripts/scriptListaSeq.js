let tamMax;

while (true) {
    tamMax = parseInt(prompt("Digite o tamanho da lista sequencial:"));
    if (tamMax > 0) {

        break; // Sai do loop se tamMax for diferente de 0 e não for NaN
    }
    alert("Tamanho inválido! O tamanho da lista não pode ser 0 ou indefinido.");
}

let lista = new Array(tamMax);
let indice = 0;

function iniciaLista() {
    criaListaVisualmente();
}

function criaListaVisualmente() {
    const visualLista = document.getElementById("visualList");
    visualLista.innerHTML = "";

    for (let i = 0; i < tamMax; i++) {
        const quadrado = document.createElement("div");
        quadrado.className = "quadrado-animado";
        visualLista.appendChild(quadrado);
    }
}

function atualizaListaVisual() {
    const quadrados = document.querySelectorAll(".quadrado");
    quadrados.forEach((quadrado, indices) => {
        if (lista[indices] !== undefined) {
            quadrado.textContent = lista[indices];
        } else {
            quadrado.textContent = "";
        }
    });

    const elementoConteudo = document.getElementById("elementoConteudo");
    elementoConteudo.textContent = `Número de elementos: ${indice}`;
}

function insereNumero() {
    if(indice == tamMax){
        alert("A listaa está totalmente preenchida");
        return;
    }
    
    const numInput = document.getElementById("numInput");
    const posInput = document.getElementById("posInput");
    const numero = parseInt(numInput.value);
    const posicao = isNaN(parseInt(posInput.value)) ? -1 : parseInt(posInput.value);


    if (posicao === 0) {
        alert("A posição deve ser maior do que 0.");
    } else if (!isNaN(numero) && posicao == -1) {
        lista[indice] = numero;
        indice++;
        atualizaListaVisual();
    } else if (!isNaN(numero) && posicao >= 0 && posicao <= tamMax && posicao <= indice + 1) {
        let aux = indice;
        for (let j = aux; j >= posicao - 1; j--) {
            lista[j + 1] = lista[j]; // Move o elemento à direita para a próxima posição
        }
        lista[posicao - 1] = numero;
        indice++;
        atualizaListaVisual();
    } else if (!isNaN(numero) && posicao >= 0 && posicao <= tamMax && posicao == indice + 1) {
        lista[posicao - 1] = numero;
        indice++;
        atualizaListaVisual();
    } else {
        alert("Insira um número válido ou uma posição válida.");
    }
}

function deleteNumeroPosicao() {
    const posInput = document.getElementById("posInput");
    const posicao = parseInt(posInput.value);

    if (posicao >= 1 && posicao <= indice) {
        for (let i = posicao - 1; i < indice - 1; i++) {
            lista[i] = lista[i + 1];
        }
        lista[indice - 1] = undefined;
        indice--;
        atualizaListaVisual();
    } else {
        alert("Insira uma posição válida.");
    }
}

function buscaNumero() {
    const numInput = document.getElementById("numInput");
    const numero = parseInt(numInput.value);
    const posicoes = [];

    for(let i = 0; i < tamMax; i++){
        if(lista[i] == numero){
            posicoes.push(i+1);
        }
    }

    if(posicoes.length!=0){
        alert(`O número ${numero} está ocupando as posições ${posicoes}.`);
    }

    if(posicoes.length==0){
        alert("Ops, número não foi encontrado.");
        return;  
    } 
}

function buscaNumeroPosicao() {
    const posInput = document.getElementById("posInput");
    const posicao = parseInt(posInput.value);

    if (posicao >= 0 && posicao < tamMax) {
        const numero = lista[posicao - 1];
        if (numero !== undefined) {
            alert(`O número ${numero} está ocupando a posição ${posicao}.`);
        } else {
            alert("A posição está vazia na lista.");
        }
    } else {
        alert("Insira uma posição válida.");
    }
}

function displaylista() {
    const output = document.getElementById("output");
    output.innerHTML = "listaa: " + lista.filter((num) => num !== undefined).join(", ");
}

iniciaLista();