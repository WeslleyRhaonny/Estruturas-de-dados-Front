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

    criaListaVisualmente() {
        const visualList = document.getElementById("visualList");
        visualList.innerHTML = "";
    
        let aux = lista.cabeca;
        const posInsercao = isNaN(parseInt(document.getElementById("posInput").value)) ? this.nElementos : parseInt(document.getElementById("posInput").value);
        let posicaoAtual = 1; // Variável para rastrear a posição atual
    
        while (aux) {
            const quadrado = document.createElement("div");
            quadrado.textContent = aux.conteudo;
    
            if (posicaoAtual === posInsercao) {
                quadrado.className = "quadrado-animado";
            } else {
                quadrado.className = "quadrado";
            }
    
            visualList.appendChild(quadrado);
            this.addArrow();
    
            if (aux.prox === null) {
                const nullBox = document.createElement("div");
                nullBox.className = "quadrado";
                nullBox.textContent = "Null";
                visualList.appendChild(nullBox);
            }
    
            aux = aux.prox;
            posicaoAtual++;
        }
    }
    
    
    criaListaVisualmenteRemocao() {
        const visualList = document.getElementById("visualList");
        visualList.innerHTML = "";
    
        let aux = lista.cabeca;
    
        while (aux) {
            const quadrado = document.createElement("div");
            quadrado.className = "quadrado";
            quadrado.textContent = aux.conteudo;
            visualList.appendChild(quadrado);
            this.addArrow();
            if (aux.prox === null) {
                const nullBox = document.createElement("div");
                nullBox.className = "quadrado"; 
                nullBox.textContent = "Null";
                visualList.appendChild(nullBox);
            }
            aux = aux.prox;
        }
    }

    atualizaListaVisual() {
        const elementCount = document.getElementById("elementCount");
        elementCount.textContent = `Número de elementos: ${this.nElementos}`;
    }

    addArrow() {
        const arrow = document.createElement("div");
        arrow.textContent = "➞"; // Caractere da seta
        arrow.className = "arrow";
        visualList.appendChild(arrow);
    }

    insereInicioLista() {
        let novoNo = new No();
        novoNo.conteudo = parseInt(document.getElementById("numberInput").value);

        if (isNaN(novoNo.conteudo)) {
            alert("O campo 'Insira um número' não pode estar vazio.");
            return false;
        }

        novoNo.prox = this.cabeca;
        this.cabeca = novoNo;
        this.nElementos++;


        // Cria caixas com base na lista atualizada
        this.criaListaVisualmente();
        this.atualizaListaVisual();
        return true;
    }

    insereMeioLista() {
        let novoNo = new No();
        novoNo.conteudo = parseInt(document.getElementById("numberInput").value);

        if (isNaN(novoNo.conteudo)) {
            alert("O campo 'Insira um número' não pode estar vazio.");
            return false;
        }

        const posInput = document.getElementById("posInput");
        const pos = isNaN(parseInt(posInput.value)) ? this.nElementos + 1 : parseInt(posInput.value);
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
        this.criaListaVisualmente();
        this.atualizaListaVisual();
        return true;
    }
    

    insere() {
        const posInput = document.getElementById("posInput");
        const pos = isNaN(parseInt(posInput.value)) ? this.nElementos + 1 : parseInt(posInput.value);

        if (pos <= 0 || parseInt(pos > this.nElementos + 1)) {
            alert("insira uma posição válida");
            return;
        }

        if (pos === 1) {
            return this.insereInicioLista();
        } else {
            return this.insereMeioLista();
        }
    }
    
    removeInicioLista() {
        if (this.vazia()) {
            return -1;
        }

        let valorRemovido = this.cabeca.conteudo;
        this.cabeca = this.cabeca.prox;
        this.nElementos--;

        // Atualize a representação visual da lista
        this.criaListaVisualmenteRemocao();
        this.atualizaListaVisual();
        return valorRemovido;
    }

    removeNaLista() {
        const pos = parseInt(document.getElementById("posInput").value);

        if (this.vazia() || pos <= 0 || pos > this.nElementos) {
            return -1;
        }

        if (pos === 1) {
            return this.removeInicioLista();
        } else {
            let antecessor = this.cabeca;
            for (let i = 1; i < pos - 1; i++) {
                antecessor = antecessor.prox;
            }
            let atual = antecessor.prox;

            let valorRemovido = atual.conteudo;
            antecessor.prox = atual.prox;

            this.nElementos--;

            // Atualize a representação visual da lista
            this.criaListaVisualmenteRemocao();
            this.atualizaListaVisual();
            return valorRemovido;
        }
    }

    remove() {
        let pos = parseInt(document.getElementById("posInput").value);
        if (this.vazia()) {
            return -1;
        }

        if (isNaN(pos)) {
            alert("insira uma posição válida");
            return false;
        }

        if (pos <= 0 || pos > this.nElementos) {
            return -1;
        }

        if (pos === 1) {
            return this.removeInicioLista();
        } else {
            return this.removeNaLista();
        }
    }

    buscaPorValor(valor) {
        let aux = this.cabeca;
        let pos = 1;
        const posicoes = [];
    
        while (aux !== null) {
            if (aux.conteudo === valor) {
                posicoes.push(pos);
            }
            aux = aux.prox;
            pos++;
        }
    
        if (posicoes.length > 0) {
            return posicoes;
        }
        return -1; // Retorna -1 se o valor não for encontrado na lista
    }
    

    buscaPorPosicao(posicao) {
        if (posicao < 1 || posicao > this.nElementos) {
            return -1; // Posição inválida
        }

        let aux = this.cabeca;
        let contador = 1;

        while (contador < posicao) {
            aux = aux.prox;
            contador++;
        }

        return aux.conteudo; // Retorna o valor na posição desejada
    }
}

const lista = new LSE(); // Cria uma instância da classe LSE

function insert() {
    lista.insere(); // Chama o método insere da instância criada
}

function remove() {
    lista.remove();
}

function buscaNumero() {
    const valorProcurado = parseInt(document.getElementById("numberInput").value);
    const posicao = lista.buscaPorValor(valorProcurado);

    if (posicao !== -1 && !isNaN(valorProcurado)) {
        alert(`O número ${valorProcurado} está na posição ${posicao}.`);
    } else {
        alert("O valor não foi encontrado na lista.");
    }
}

function buscaNumeroPosicao() {
    const posicaoDesejada = parseInt(document.getElementById("posInput").value);
    const valorEncontrado = lista.buscaPorPosicao(posicaoDesejada);

    if (valorEncontrado !== -1 && !isNaN(posicaoDesejada)) {
        alert(`O valor na posição ${posicaoDesejada} é ${valorEncontrado}.`);
    } else {
        alert("Posição inválida.");
    }
}

