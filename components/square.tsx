type Player = 'X'|'O'|null

interface Props{
    winner:Player
    value:Player
    onClick:()=>void
}

function Square({value,onClick,winner}:Props) {
    if (!value) {
        return <button className="square" onClick={onClick} disabled={Boolean(winner)}></button>
    }
    return <button className={`square ${value==='O'?'bg-green-400':'bg-red-500'}`} onClick={onClick} disabled>{value}</button>
}

export default Square
