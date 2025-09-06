const currentPlayer = document.querySelector(".currentPlayer")

let selected
let jogador = "X"

let positions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

function init() {
  selected = []
  currentPlayer.innerHTML = `VEZ DE: ${jogador}`

  document.querySelectorAll(".game button").forEach((item) => {
    item.innerHTML = ""
    item.addEventListener("click", novoMove)
  })
}
init()

function novoMove(e) {
  const index = Number(e.target.getAttribute("data-i"))
  e.target.innerHTML = jogador
  e.target.removeEventListener("click", novoMove)
  selected[index] = jogador

  setTimeout(() => {
    check()
  }, 100)

  jogador = jogador === "X" ? "O" : "X"
  currentPlayer.innerHTML = `VEZ DE: ${jogador}`
}

function check() {
  let playerLastMove = jogador === "X" ? "O" : "X"

  const items = selected
    .map((item, i) => [item, i])
    .filter((item) => item[0] === playerLastMove)
    .map((item) => item[1])

  for (let pos of positions) {
    if (pos.every((item) => items.includes(item))) {
      alert(`O jogador '${playerLastMove}' ganhou!`)
      init()
      return
    }
  }

  if (selected.filter((item) => item).length === 9) {
    alert("Deu velha...")
    init()
    return
  }
}
