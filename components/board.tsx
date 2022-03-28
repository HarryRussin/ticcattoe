import { useEffect } from 'react'
import { useState } from 'react'
import Square from './square'

function CalcWinner(board: 'X' | 'O' | null[]) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ]
  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }
  return null
}


function Board() {
  const [api, setapi] = useState()

  const [board, setboard] = useState(Array(9).fill(null))
  const [currentPlayer, setcurrentPlayer] = useState<'X' | 'O'>(
    Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
  )
  const [winner, setwinner] = useState<string | null>(null)

  const getApiReq =  () => {
    let quote = fetch('https://dog.ceo/api/breeds/image/random')
    .then(res=>res.json())
    .then((res)=>{setapi(res);console.log(res)})
    .catch((err)=>{console.log(err);
    })
  }
  
  function reset() {
    getApiReq()
    setboard(Array(9).fill(null))
    setwinner(null)
    setcurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
  }

  function setSquareValue(i: number) {
    const newData = board.map((val, iv) => {
      if (iv === i) {
        return currentPlayer
      } else {
        return val
      }
    })
    setboard(newData)
    setcurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  useEffect(() => {
    const w = CalcWinner(board)
    if (w) {
      setwinner(w)
      setcurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
    }
    if (!w && !board.filter((square) => !square).length) {
      setwinner('TIE')
    }
  }, [board])

  return (
    <div className="flex flex-col">
      <style jsx global>
        {//@ts-ignore
        `body{background-image:url(${api?.message});width:100vw;height-100vh;object-fit:cover;}`}
        </style>
    <div className="max-w-xl">
      {winner ? (
        <p className="mb-3 font-serif text-xl sm:text-2xl">
          {winner === 'TIE' ? (
            "It's a tie!"
          ) : (
            <p>Congratulations {currentPlayer}!</p>
          )}
        </p>
      ) : (
        <p className="mb-3 font-serif text-xl sm:text-2xl">
          Hey {currentPlayer}, it's your turn
        </p>
      )}
      <div className={`grid grid-cols-3`}>
        {board.map((_, i) => (
          <Square
            key={i}
            //@ts-ignore
            winner={winner}
            onClick={() => {setSquareValue(i);getApiReq()}}
            value={board[i]}
          />
        ))}
      </div>
      <button
        onClick={reset}
        className="mt-3 rounded-lg border-2 border-cyan-400 bg-cyan-400 px-6 text-2xl text-white transition-all hover:bg-gray-50 hover:text-cyan-400"
      >
        Reset
      </button>
    </div>
    </div>
  )
}

export default Board
