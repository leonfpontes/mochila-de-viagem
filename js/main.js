/* Variáveis */
const lista = document.getElementById('lista')
const form = document.getElementById("novoItem")
const itens = JSON.parse(localStorage.getItem("itens")) || []

/* Carrega os dados do local storage na tela */
itens.forEach(elemento => {
    criaElemento(elemento)
});

/* função anônima que pega os valores do form, 
    chama a criação do elemento e limpa o formulário */
form.addEventListener("submit", (evento)=>{
    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)
    /* Define o objeto que será salvo no local storage */
    const itemAtual = {
        "nome" : nome.value,
        "quantidade" : quantidade.value
    }
    evento.preventDefault();
    
    if (existe){
        itemAtual.id = existe.id
        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual

    } else {
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1]).id + 1 : 0;
        /* Reseta comportamento do Submit */
        criaElemento(itemAtual)

        /* Insere o item na lista antes de mandar para o local storage */
        itens.push(itemAtual)
    }
    

    /* Converte o item para JSON e insere no local storage*/
    localStorage.setItem("itens", JSON.stringify(itens))
    
    /* Limpa o formulário */
    nome.value = ''
    quantidade.value = ''
})

/* Função de criação do elemento na lista HTML */
function criaElemento(item){
    const novoItem = document.createElement('li')
    novoItem.classList.add('item')
    
    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id
    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))
    /* Insere o novo item na lista */
    lista.appendChild(novoItem)
}

function atualizaElemento (item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"
    elementoBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento(tag, id){
    tag.remove()
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
    localStorage.setItem("itens", JSON.stringify(itens))
}