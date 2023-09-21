class No {
    constructor() {
        this.conteudo = null;
        this.prox = null;
    }
}

class LSE {
    constructor() {
        this.cabeca = null;
        this.nElementos = 0;
    }

    vazia() {
        return this.nElementos === 0;
    }

    tamanho() {
        let aux = this.cabeca;
        let cont = 0;
        while (aux !== null) {
            aux = aux.prox();
            cont++;
        }
        return cont;
    }

    elemento(pos) {
        if (this.vazia()) {
            return -1;
        }

        if (pos < 1 || pos > this.tamanho()) {
            return -1;
        }

        let aux = this.cabeca;
        for (let i = 1; i < pos; i++) {
            aux = aux.prox;
        }

        return aux.conteudo();
    }

    posicao(dado) {
        if (this.vazia()) {
            return -1;
        }

        let aux = this.cabeca;
        let cont = 1;
        while (aux !== null) {
            if (aux.conteudo() === dado) {
                return cont;
            }
            aux = aux.prox;
            cont++;
        }

        return -1;
    }

    createVisualList() {
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

    insereInicioLista() {
        let novoNo = new No();
        novoNo.conteudo = parseInt(document.getElementById("numberInput").value);

        novoNo.prox = this.cabeca;
        this.cabeca = novoNo;
        this.nElementos++;

        // Cria caixas com base na lista atualizada
        this.createVisualList();
        return true;
    }

    insereMeioLista() {
        let novoNo = new No();
        novoNo.conteudo = parseInt(document.getElementById("numberInput").value);
    
        const pos = parseInt(document.getElementById("posInput").value);
    
        if (pos <= 0 || pos > this.nElementos + 1) {
            return false;
        }
    
        let aux = this.cabeca;
        for (let i = 1; i < pos - 1; i++) {
            aux = aux.prox;
        }
    
        novoNo.prox = aux.prox;
        aux.prox = novoNo;
    
        this.nElementos++;
        // Cria caixas com base na lista atualizada
        this.createVisualList();
        return true;
    }
    

    insere() {
        if (this.vazia() && parseInt(document.getElementById("posInput").value) !== 1) {
            alert("insira o primeiro elemento na posição 1");
            return;
        }

        if (parseInt(document.getElementById("posInput").value) <= 0 || parseInt(document.getElementById("posInput").value) > this.nElementos + 1) {
            alert("insira uma posição válida");
            return;
        }

        if (parseInt(document.getElementById("posInput").value) === 1) {
            return this.insereInicioLista();
        } else {
            return this.insereMeioLista();
        }
    }
    
    removeInicioLista() {
        let p = this.cabeca;
        let valorRemovido = p.conteudo();

        this.cabeca = p.prox();
        this.nElementos--;

        p = null;

        return valorRemovido;
    }

    removeNaLista() {
        let antecessor = this.cabeca;
        let pos = parseInt(document.getElementById("posInput").value);
        for (let i = 1; i < pos - 1; i++) {
            antecessor = antecessor.prox();
        }
        let atual = antecessor.prox();

        let valorRemovido = atual.conteudo();

        antecessor.prox(atual.prox());

        this.nElementos--;

        atual = null;

        return valorRemovido;
    }

    remove() {
        let pos = parseInt(document.getElementById("posInput").value);
        if (this.vazia()) {
            return -1;
        }

        if (pos <= 0 || pos > this.nElementos) {
            return -1;
        }

        if (pos === 1) {
            alert("Deu Certo1");
            return this.removeInicioLista();
        } else {
            alert("Deu Certo2");
            return this.removeNaLista();
        }
    }
}

const lista = new LSE(); // Cria uma instância da classe LSE

function insert() {
    lista.insere(); // Chama o método insere da instância criada
}

function remove() {
    lista.remove();
}

function searchNumber() {
    
}

function searchNumberPosition() {
    let pos = parseInt(document.getElementById("posInput").value);
    let cont = 1;
    let aux = this.cabeca;
    if(this.vazia()){
        alert("Lista vazia!");
    }

    if(pos < 1 || pos > this.nElementos){
        alert("Posição inválida!");
    }

    while(cont < pos){
        let aux = aux.prox();
        cont++;
    }
    
    return aux.conteudo();
}

/*function insertNumber(){
    const numberInput = document.getElementById("numberInput");
    const number = parseInt(numberInput.value);
    const posInput = document.getElementById("posInput");
    const position = parseInt(posInput.value);

    const novoNo = new No(number);
    
    if (nElementos == 0) {
        this.cabeca = novoNo;
        nElementos++;
    } 
    else if(position > nElementos){
        let atual = this.cabeca; // Atual começa da cabeça
        
        while (atual.proximo != null) { // Pega o próximo até chegar no
            atual = atual.proximo;
        }
        atual.proximo = novoNo;
        nElementos++;
    } 
    else {
        let atual = this.cabeca;
        let positianAtual = 0;
        
        while(positianAtual < position){
            positianAtual++;
            atual = atual.proximo;
        }
        atual.proximo = novoNo;

    }

    const LSE = new LSE();

}
*/