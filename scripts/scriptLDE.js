class No {
    constructor() {
        this.conteudo = null;
        this.prox = null;
        this.ant = null
    }
}

class LDE {
    constructor(){
        this.cabeca = null;
        this.cauda = null;
        this.nElementos = 0;
    }
    vazia(){
        if(this.nElementos == 0){
            return("Lista vazia!")
        }
    }

    tamanho() {
        return this.nElementos;
    }
    
    elemento(pos) {
        if (this.vazia()) {
            return -1;
        }

        if (pos < 1 || pos > this.tamanho()) {
            return -1;
        }

        let aux = this.cabeca;
        let cont = 1;
    
        while(cont<pos){
            aux = aux.prox();
        cont++;
        }
        return aux.conteudo();
    }
    
    posicao(dado) {
        let aux = this.cabeca;
        let cont = 1;
        if(this.vazia()){
            alert("Lista vazia!");
        }
    
        while(this.aux != null){
            if(aux.conteudo() == this.number){
                return this.cont;
            }
            aux = aux.prox();
            cont++;
        }
    }

    criaListaVisualmente() {
        const visualList = document.getElementById("visualList");
        visualList.innerHTML = "";
    
        let aux = lista.cabeca;
    
        while (aux) {
            const square = document.createElement("div");
            square.className = "square";
            square.textContent = aux.conteudo;
            visualList.appendChild(square);
            aux = aux.prox;
    }
}

    atualizaListaVisual() {
        const elementCount = document.getElementById("elementCount");
        elementCount.textContent = `Número de elementos: ${this.nElementos}`;
    }

    insereInicioLista(){
        let novoNo = new No();
        let inicio = this.cabeca;
        novoNo.conteudo = parseInt(document.getElementById("numberInput").value);
        novoNo.ant = null;
        novoNo.prox = inicio;
        if(this.vazia()){
            this.cauda = novoNo;
        } else {
            inicio.ant(novoNo);
        }
        inicio = novoNo;
        nElementos++;
        this.criaListaVisualmente();
        this.atualizaListaVisual();
    }

    insereFimLista(){
        let novoNo = new No();
        novoNo.conteudo = parseInt(document.getElementById("numberInput").value);
        let fim = this.cauda;
        novoNo.prox = null;
        fim.prox = novoNo;
        novoNo.ant = fim;
        fim.prox = novoNo;
        fim = novoNo;
        nElementos++;
        this.criaListaVisualmente();
        this.atualizaListaVisual();
    }
    
    insereMeioLista(){
        let cont = 1;
        let novoNo = new No();
        novoNo.conteudo = parseInt(document.getElementById("numberInput").value);
        let aux = this.cabeca;
        while((cont < pos-1) && (aux != null)){
            aux = aux.prox;
            cont++;
        }
        if(aux == null){
            return false;
        }
        aux = novoNo.ant;
        novoNo.prox = aux.prox;
        if (aux.prox !== null) {
            aux.prox.ant = novoNo; // Nova instrução
        }
        aux.prox = novoNo;
        nElementos++;
        return true;
    }


    insere() {
        if (this.vazia() && parseInt(document.getElementById("posInput").value) !== 1) {
            return false;
        }

        if (parseInt(document.getElementById("posInput").value) <= 0 || parseInt(document.getElementById("posInput").value) > this.nElementos + 1) {
            return false;
        }

        if (parseInt(document.getElementById("posInput").value) === 1) {
            alert("Deu certo1");
            return this.insereInicioLista();
        } else if (this.posicao > 1 && this.posicao < this.nElementos){
            alert("Insere meio");
            return this.insereMeioLista();
        } else {
            alert("Deu certo2");
            return this.insereFimLista();
        }
    }


}

const lista = new LDE(); // Cria uma instância da classe LDE

function insert() {
    lista.insere(); // Chama o método insere da instância criada
}

function remove() {
    lista.remove();
}

function buscaNumero() {
    const valorProcurado = parseInt(document.getElementById("numberInput").value);
    const posicao = lista.buscaPorValor(valorProcurado);

    if (posicao !== -1) {
        alert(`O número ${valorProcurado} está na posição ${posicao}.`);
    } else {
        alert("O valor não foi encontrado na lista.");
    }
}

function buscaNumeroPosicao() {
    const posicaoDesejada = parseInt(document.getElementById("posInput").value);
    const valorEncontrado = lista.buscaPorPosicao(posicaoDesejada);

    if (valorEncontrado !== -1) {
        alert(`O valor na posição ${posicaoDesejada} é ${valorEncontrado}.`);
    } else {
        alert("Posição inválida.");
    }
}

