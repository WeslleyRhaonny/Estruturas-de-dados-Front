class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.svgElement = null; // Adicione este atributo
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
        this.tamanho = 0;
    }   

    isEmpty() {
        return this.root === null;
    }

    drawTree() {
        const svg = document.getElementById("treeSVG");
        const svgWidth = 1200; // Largura inicial
        const svgHeight = 600; // Altura inicial
    
        // Função interna para calcular a largura e a altura necessárias
        function calculateDimensions(node, offsetX, offsetY) {
            if (node) {
                if (offsetX > svgWidth) {
                    svgWidth = offsetX;
                }
                if (offsetY > svgHeight) {
                    svgHeight = offsetY;
                }
                const newOffsetX = offsetX / 2;
                const newOffsetY = offsetY + 100;
    
                if (node.left) {
                    calculateDimensions(node.left, newOffsetX, newOffsetY);
                }
                if (node.right) {
                    calculateDimensions(node.right, newOffsetX, newOffsetY);
                }
            }
        }
    
        // Comece o desenho a partir da raiz
        if (this.root) {
            calculateDimensions(this.root, svgWidth / 2, 0);
        }
    
        // Ajuste a largura e a altura do SVG de acordo com os cálculos
        svg.setAttribute("width", svgWidth);
        svg.setAttribute("height", svgHeight);
    
        // Função interna para desenhar os nós e conexões
        function drawNode(node, x, y, offsetX) {
            if (node) {
                // Verifique se o nó já foi desenhado
                if (!node.svgElement) {
                    // Desenhe o círculo representando o nó
                    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    circle.setAttribute("cx", x);
                    circle.setAttribute("cy", y);
                    circle.setAttribute("r", 20);
                    svg.appendChild(circle);
    
                    // Exiba o valor do nó
                    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
                    text.setAttribute("x", x);
                    text.setAttribute("y", y + 5);
                    text.setAttribute("text-anchor", "middle");
                    text.setAttribute("fill", "#FFA500");
                    text.textContent = node.value;
                    svg.appendChild(text);
    
                    // Defina o elemento SVG no nó
                    node.svgElement = circle;
    
                    // Armazene as coordenadas no nó para atualizações futuras
                    node.x = x;
                    node.y = y;
                }
    
                // Calcule as coordenadas para os filhos
                const offsetY = 100;
    
                if (node.left) {
                    const xLeft = x - offsetX;
                    const yLeft = y + offsetY;
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", x);
                    line.setAttribute("y1", y + 20);
                    line.setAttribute("x2", xLeft);
                    line.setAttribute("y2", yLeft - 20);
                    line.setAttribute("stroke", "#FFA500");
                    svg.appendChild(line);
                    drawNode(node.left, xLeft, yLeft, offsetX / 2);
                }
    
                if (node.right) {
                    const xRight = x + offsetX;
                    const yRight = y + offsetY;
                    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
                    line.setAttribute("x1", x);
                    line.setAttribute("y1", y + 20);
                    line.setAttribute("x2", xRight);
                    line.setAttribute("y2", yRight - 20);
                    line.setAttribute("stroke", "#FFA500");
                    svg.appendChild(line);
                    drawNode(node.right, xRight, yRight, offsetX / 2);
                }
            }
        }
    
        // Comece o desenho a partir da raiz
        if (this.root) {
            drawNode(this.root, svgWidth / 2, 50, svgWidth / 4);
        }
    }

    atualizaArvoreVisual() {
        const elementCount = document.getElementById("elementCount");
        elementCount.textContent = `Número de elementos: ${this.tamanho}`;
    }

    removeNodeVisual(nodeVisual) {
        if (this.nodeVisual === null) {
            return;
        }
    
        const svg = document.getElementById("treeSVG");
    
        // Remova o círculo representando o nó
        if (node.svgElement) {
            svg.removeChild(node.svgElement);
        }
    
        // Remova o texto representando o valor do nó
        const textElements = svg.getElementsByTagName("text");
        for (let i = 0; i < textElements.length; i++) {
            if (textElements[i].textContent === node.value.toString()) {
                svg.removeChild(textElements[i]);
                break; // Saia do loop depois de encontrar e remover o texto
            }
        }
    
        // Após a remoção visual, defina o elemento SVG no nó como nulo
        node.svgElement = null;
    
        // Agora você pode chamar a função de desenhar novamente para atualizar a árvore
        this.drawTree(); // Esta linha atualiza a árvore visual
    }
    
    

    
    search(node, value) {
        if (node === null) {
            return null;
        }

        if (node.value === value) {
            return node;
        }

        if (value < node.value) {
            return this.search(node.left, value);
        } else {
            return this.search(node.right, value);
        }
    }

    searchValue(value) {
        return this.search(this.root, value);
    }

    searchValueIterative(value) {
        if (this.isEmpty()) {
            return null;
        }

        let current = this.root;

        while (current !== null) {
            if (current.value === value) {
                return current;
            }

            if (value < current.value) {
                current = current.left;
            } else {
                current = current.right;
            }
        }

        return null;
    }

    inOrder(node, callback) {
        if (node !== null) {
            this.inOrder(node.left, callback);
            callback(node);
            this.inOrder(node.right, callback);
        }
    }

    displayInOrder(callback) {
        if (this.isEmpty()) {
            console.log("Árvore vazia");
        } else {
            this.inOrder(this.root, callback);
        }
    }

    displayInOrderReverse(callback) {
        if (this.isEmpty()) {
            console.log("Árvore vazia");
        } else {
            this.inOrderReverse(this.root, callback);
        }
    }

    inOrderReverse(node, callback) {
        if (node !== null) {
            this.inOrderReverse(node.right, callback);
            callback(node);
            this.inOrderReverse(node.left, callback);
        }
    }

    insert() {
        const value = parseInt(document.getElementById("numberInput").value); // Obtenha o valor do campo de entrada
        if (!isNaN(value)) { // Verifique se é um número válido
            const newNode = new Node(value);

            if (this.root === null) {
                this.root = newNode;
                this.tamanho++;
            } else {
                let current = this.root;
                let parent = null;

                while (current !== null) {
                    parent = current;

                    if (value === current.value) {
                        alert("Valor já existe na árvore.");
                        return;
                    }

                    if (value < current.value) {
                        current = current.left;
                    } else {
                        current = current.right;
                    }
                }

                if (value < parent.value) {
                    parent.left = newNode;
                    this.tamanho++;
                } else {
                    parent.right = newNode;
                    this.tamanho++;
                }
            }

            this.atualizaArvoreVisual();
        }
    }

    remove(value) {
        this.root = this.removeNode(this.root, value);
    }

    removeNode(node, key) {
        if (node === null) {
            return null;
        }

        if (key < node.value) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (key > node.value) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                this.tamanho--;
                return node;
            }

            if (node.left === null) {
                node = node.right;
                this.tamanho--;
                return node;
            } else if (node.right === null) {
                node = node.left;
                this.tamanho--;
                return node;
            }

            const minValueNode = this.findMinNode(node.right);
            node.value = minValueNode.value;
            node.right = this.removeNode(node.right, minValueNode.value);
            this.tamanho--;
            return node;
        }
    }

    findMinNode(node) {
        if (node.left === null) {
            return node;
        }
        return this.findMinNode(node.left);
    }
        
}

const bst = new BinarySearchTree();

/*function insert() {
    bst.insert(); // Chama o método insere da instância criada
}

function remove() {
    const valueToRemove = parseInt(document.getElementById("numberInput").value);
    bst.remove(valueToRemove);
}*/


// ===== Função de animação =====
function animateSearchResult(nodeElement) {
    let count = 0;

    function blink() {
        if (count < 6) { // Piscar 3 vezes (Muda para original - Muda para outra cor)
            if (count % 2 === 0) {
                nodeElement.style.fill = "black";
            } else {
                nodeElement.style.fill = "#FFA500";
                nodeElement.nextElementSibling.style.fill = "#FFF";
            }
            count++;
            setTimeout(blink, 500); // Pisca a cada 500ms
        } else {
            // Restaura os padrões originais
            nodeElement.style.fill = "black";
            nodeElement.nextElementSibling.style.fill = "#FFA500";
        }
    }
    blink(); // Chama a animação.
}

function search() {
    const valor = parseInt(document.getElementById("numberInput").value);
    const resultadoBusca = tree.searchValueIterative(valor);

    if (resultadoBusca === null) {
        alert("Nenhum elemento na lista com o valor: " + valor);
    } else {
        //animateSearchResult(resultadoBusca.svgElement); // Chama a animação

        const valorEsq = resultadoBusca.left ? resultadoBusca.left.value : "não possui";
        const valorDir = resultadoBusca.right ? resultadoBusca.right.value : "não possui";

        // !!!!!!!!!!!!!!! Perguntar ao pessoal se é melhor só a animação ou se é bom ter o alert !!!!!!!!!!!!!!!
        alert("O elemento de valor " + valor + " está na lista. Filho da esquerda: " + valorEsq + ". Filho da direita: " + valorDir);
    }
}

function animateSearchResultInOrdem(nodeElement) {
    function blink(count) {
        if (count < 2) { // Piscar uma vez (Muda para original - Muda para outra cor)
            nodeElement.style.fill = "black";
            nodeElement.style.fill = "#FFA500";
            nodeElement.nextElementSibling.style.fill = "#FFF";
            setTimeout(() => {
                blink(count + 1);
            }, 500); // Pisca a cada 500ms
        } else {
            // Restaura os padrões originais
            nodeElement.style.fill = "black";
            nodeElement.nextElementSibling.style.fill = "#FFA500";
        }
    }
    blink(0); // Chama a animação pela primeira vez.
}

function exibeInOrdem_(nodeList, index) {
    if (index < nodeList.length) {
        const node = nodeList[index];
        animateSearchResultInOrdem(node.svgElement); // Chama a animação
        setTimeout(function () {
            //animateSearchResultInOrdem(node.svgElement); // Reverte a animação
            exibeInOrdem_(nodeList, index + 1); // Chama a próxima animação
        }, 2000); // Atraso de 2 segundos entre cada nó em milissegundos
    }
}

function exibeInOrdem() {
    if (tree.isEmpty()) {
        console.log("Árvore vazia");
    } else {
        const nodeList = [];
        tree.inOrder(tree.root, (node) => {
            nodeList.push(node);
        });
        exibeInOrdem_(nodeList, 0); // Inicia a animação a partir do primeiro nó
    }
}

const tree = new BinarySearchTree();
const treeContainer = document.getElementById("tree-container");
const insertButton = document.getElementById("insertNode");
const removeButton = document.getElementById("removeNodeButton");
const searchButton = document.getElementById("searchNodeButton");
const walkButton = document.getElementById("walkNodeButton");
const nodeValueInput = document.getElementById("numberInput");
const removeNodeInput = document.getElementById("removeNode");

insertButton.addEventListener("click", () => {
    const value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        tree.insert(value);
        renderTree();
    }
    nodeValueInput.value = "";
});

removeButton.addEventListener("click", () => {
    const value = parseInt(nodeValueInput.value);
    if (!isNaN(value)) {
        tree.remove(value);
        renderTree();
    }
    tree.atualizaArvoreVisual();
    nodeValueInput.value = "";
});

searchButton.addEventListener("click", () => {
    const valor = parseInt(document.getElementById("numberInput").value);
    const resultadoBusca = tree.searchValueIterative(valor);

    if (resultadoBusca === null) {
        alert("Nenhum elemento na lista com o valor: " + valor);
    } else {
        animateSearchResult(resultadoBusca.svgElement); // Chama a animação

        const valorEsq = resultadoBusca.left ? resultadoBusca.left.value : "não possui";
        const valorDir = resultadoBusca.right ? resultadoBusca.right.value : "não possui";

        // !!!!!!!!!!!!!!! Perguntar ao pessoal se é melhor só a animação ou se é bom ter o alert !!!!!!!!!!!!!!!
        //alert("O elemento de valor " + valor + " está na lista. Filho da esquerda: " + valorEsq + ". Filho da direita: " + valorDir);
    }
    nodeValueInput.value = "";
});

walkButton.addEventListener("click", () => {
    if (tree.isEmpty()) {
        console.log("Árvore vazia");
    } else {
        const nodeList = [];
        tree.inOrder(tree.root, (node) => {
            nodeList.push(node);
        });
        exibeInOrdem_(nodeList, 0); // Inicia a animação a partir do primeiro nó
    }
    removeNodeInput.value = "";
});

function renderTree() {
    // Limpar o conteúdo do contêiner da árvore
    treeContainer.innerHTML = "";

    // Construir e renderizar a árvore usando SVG
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "1200");
    svg.setAttribute("height", "600");

    if (tree.root) {
        renderNode(tree.root, 600, 50, 600);
    }

    treeContainer.appendChild(svg);
}

function renderNode(node, x, y, xOffset) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 20);
    circle.setAttribute("stroke", "#FFA500"); // Cor do contorno do círculo
    circle.setAttribute("fill", "black");    // Cor do preenchimento do círculo
    treeContainer.appendChild(circle);

    // Defina a referência ao elemento SVG no objeto de nó
    node.svgElement = circle;

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", x);
    text.setAttribute("y", y + 5);
    text.setAttribute("text-anchor", "middle");
    text.textContent = node.value;
    text.setAttribute("fill", "#FFA500");  // Cor do texto (laranja)
    treeContainer.appendChild(text);

    if (node.left) {
        // Desenhar uma linha para o nó esquerdo
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", y + 20);
        line.setAttribute("x2", x - xOffset / 2);
        line.setAttribute("y2", y + 70);
        line.setAttribute("stroke", "#FFA500");
        treeContainer.appendChild(line);

        renderNode(node.left, x - xOffset / 2, y + 70, xOffset / 2);
    }

    if (node.right) {
        // Desenhar uma linha para o nó direito
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", y + 20);
        line.setAttribute("x2", x + xOffset / 2);
        line.setAttribute("y2", y + 70);
        line.setAttribute("stroke", "#FFA500");
        treeContainer.appendChild(line);

        renderNode(node.right, x + xOffset / 2, y + 70, xOffset / 2);
    }
}


renderTree();