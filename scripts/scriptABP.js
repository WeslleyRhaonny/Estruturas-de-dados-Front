class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
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
            this.drawTree();
        }
    }

    findMinValue(node) {
        if (node.left === null) {
            return node.value;
        }
        return this.findMinValue(node.left);
    }

    remove(node, value) {
        if (node === null) {
            return null;
        }

        if (value < node.value) {
            node.left = this.remove(node.left, value);
        } else if (value > node.value) {
            node.right = this.remove(node.right, value);
        } else {
            if (node.left === null && node.right === null) {
                node = null;
            } else if (node.left === null) {
                node = node.right;
            } else if (node.right === null) {
                node = node.left;
            } else {
                const minValue = this.findMinValue(node.right);
                node.value = minValue;
                node.right = this.remove(node.right, minValue);
            }
        }

        return node;
    }

    removeValue(value) {
        this.root = this.remove(this.root, value);
    }
}

const bst = new BinarySearchTree();

function insert() {
    bst.insert(); // Chama o método insere da instância criada
}

function search() {
    const valor = parseInt(document.getElementById("numberInput").value);
    const resultadoBusca = bst.searchValueIterative(valor);

    if (resultadoBusca === null) {
        alert("Nenhum elemento na lista com o valor: " + valor);
    } else {
        const valorEsq = resultadoBusca.left ? resultadoBusca.left.value : "não possui";
        const valorDir = resultadoBusca.right ? resultadoBusca.right.value : "não possui";

        alert("O elemento de valor " + valor + " está na lista. Filho da esquerda: " + valorEsq + ". Filho da direita: " + valorDir);
    }
}
