// variáveis de estado de jogo.

let flippedCards = [] // Array que armazena as cartas viradas(sempre terá no máximo duas).
let matchedPairs = 0 // contador de pares encontrados.
let attempts = 0 // contador de tentativas.
let isCheckingPair = false // Trava o jogo enquanto verifica o par ou esconde as cartas.

// Array com todas as cartas do jogo
const cardItems = [
    {id: 1, content: "👓", matched: false},
    {id: 2, content: "👓", matched: false},
    {id: 3, content: "👄", matched: false},
    {id: 4, content: "👄", matched: false},
    {id: 5, content: "💩", matched: false},
    {id: 6, content: "💩", matched: false},
    {id: 7, content: "👽", matched: false},
    {id: 8, content: "👽", matched: false},
    {id: 9, content: "🚀", matched: false},
    {id: 10, content: "🚀", matched: false},
    {id: 11, content: "🍰", matched: false},
    {id: 12, content: "🍰", matched: false},
    {id: 13, content: "🏯", matched: false},
    {id: 14, content: "🏯", matched: false},
    {id: 15, content: "♣️", matched: false},
    {id: 16, content: "♣️", matched: false},
]
// função embaralhar as cartas
function shuffleCards(array){
    const shuffled = array.sort(() => (Math.random() > 0.5 ? 1 : -1))
    return shuffled
}
//criar cartas
function createCard(card){
    //cria elemento principal da carta
    const cardElement = document.createElement("div")
    cardElement.className = ("card")

    //cria o elemento emoji
    const emoji = document.createElement("span")
    emoji.className = "card-emoji"
    emoji.textContent = card.content

    //adiciona o emoji ao card
    cardElement.appendChild(emoji)

    //adiciona evento de clique
    cardElement.addEventListener("click", () => handleCardClick(cardElement, card))

    return cardElement
}
//função para criar as cartas
function renderCards(){
    const deck = document.getElementById("deck")
    deck.innerHTML = ""

    const cards = shuffleCards(cardItems) 
    cards.forEach((item) => {
        const cardElement = createCard(item)
        deck.appendChild(cardElement)
    })
}

function handleCardClick(cardElement, card){
    if(isCheckingPair // ignora o clique enquanto verifica o par.
        || cardElement.classList.contains("revealed") //ignora o clique se a carta já está virada.
        || card.matched // ignora o clique se a carta já foi encontrada.
        ){
        return
    }

    // revela a carta
    cardElement.classList.add("revealed")

    //adiciona no array as cartas viradas
    flippedCards.push({cardElement, card})

    //verifica se tem duas cartas viradas
    if(flippedCards.length === 2){
        //Atualiza para verdadeiro para sinalizar que vamos verificar o par        
        isCheckingPair = true
        //incrementa o contador de tentativas
        attempts++


        //selecionar as cartas viradas
        const [firstCard, secondCard] = flippedCards

        // verificar se as cartas formam um par
        if(firstCard.card.content === secondCard.card.content){
            firstCard.card.matched = true
            secondCard.card.matched = true
            matchedPairs++ //incrementa os pares encontrados
            isCheckingPair = false
            flippedCards = []
            updateStats()

            const toFind = cardItems.find(item => item.matched === false)
            if(!toFind){
                    alert(`Parabéns! Você encontrou todos os pares em ${attempts} tentativas!`)
            }

        } else {
            setTimeout(() => {
                firstCard.cardElement.classList.remove("revealed")
                secondCard.cardElement.classList.remove("revealed")
                isCheckingPair = false
                flippedCards = []
                updateStats()
            }, 1000)
        }

    }
    }

function updateStats(){
document.getElementById("stats").textContent = `${matchedPairs} acertos de ${attempts} Tentativas`
}

function resetGame(){
    // Reseta as variáveis de estado
    flippedCards = []
    matchedPairs = 0
    attempts = 0
    isCheckingPair = false

    cardItems.forEach(card => card.matched = false) // Reseta o estado de correspondência das cartas

    renderCards() // Re-renderiza as cartas
    updateStats() // Atualiza as estatísticas
}

function initGame(){
    renderCards()
    //adiciona o evento de reiniciar no botão
    document.getElementById("reset-game").addEventListener("click", resetGame)
}

initGame()