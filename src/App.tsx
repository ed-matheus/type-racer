import { useState } from 'react'
import './App.css'

// Importando dados de "types.ts"
import type { GameStatus, StatProps } from './types';

function App() {
  // Para tipos personalizados no TypeScript, fazemos assim:
  const [stats, setStats] = useState<StatProps>({
    wpm: 0,
    accuracy: 0,
    errorCount: 0,
  });

  const [userInput, setUserInput] = useState("")

  const fraseExemplo = "melancia"

  const handleGetValue = (e:any) => {
    e.preventDefault()
    // console.log(userInput)

    setUserInput("")
    handleCheckValue()
  }

  const handleCheckValue = () => {
    // console.log(userInput)

    // Frase/palavra que o usuário digitou
    const fraseDigitada = userInput.split("")
    console.log(fraseDigitada[0])

    // if (userInput !== fraseExemplo) {
    //   console.log('ta errado')
    // } else {
    //   console.log('ta certo')
    // }
  }

  return (
    <>
      <h1 className='text-blue-500'>Type Racer</h1>
      <div>
        <span>WPM: {stats.wpm}</span>
        <span>Precisão: {stats.accuracy}</span>
        <span>Erros: {stats.errorCount}</span>
      </div>

      <div>
        {
          fraseExemplo.split("").map((letraOriginal, i) => {
            // console.log(userInput)
            let cor;
            if (i < userInput.length) {
              userInput[i] === letraOriginal ? cor = "text-green-500" : cor = "text-red-500"
            }

            return (
              <span
                key={i}
                className={`text-gray-300 ${cor}`}
              >
                {letraOriginal}
              </span>
            )
          })
        }

        <p>{userInput}</p>
      </div>

      <form>
        <input
          className='border'
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleGetValue}>Enviar</button>
      </form>
    </>
  )
}

export default App
