import { useEffect, useState } from 'react'
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

  const [gameStatus, setGameStatus] = useState<GameStatus>("waiting")

  const [userInput, setUserInput] = useState("")

  const [seconds, setSeconds] = useState(0)

  // Frase ou palavra a ser digitada pelo usuário
  const originalText = "are you gay?"

  // Função que alterna o status do jogo entre "waiting", "typing" e "finished"
  const handleChangeStatus = (currentText: string) => {
    if (currentText.length === 1) {
      setGameStatus("typing")

    } else if (currentText.length === originalText.length) {
      setGameStatus("finished")
    }
  }

  // Aqui o cronômetro ativa assim que o status do jogo mudar
  useEffect(() => {
    let interval: number;

    if (gameStatus === 'typing') {
      console.log(`${gameStatus}...`)

      // setInterval faz alguma coisa a cada milissegundo configurado
      interval = setInterval(() => {
        setSeconds(num => num + 1)
      }, 1000)

    } else if (gameStatus === 'finished') {
      // Calculando wpm (words per minute)
      const wpm = (originalText.length / 5) / (seconds / 60)
      setStats({ ...stats, wpm: wpm })
      console.log(wpm)
    }

    return () => {
      if (interval) {
        clearInterval(interval)

        const newStatus = 'finished'
        setGameStatus(newStatus)

        console.log('Status:', newStatus)
        console.log('Time:', seconds)
      }
    }
  }, [gameStatus])

  return (
    <div className='p-5'>
      <h1 className='font-bold'>Type Racer</h1>

      <div className='flex flex-wrap items-center justify-center gap-3 font-bold mb-8'>
        <span className='bg-white text-black px-2 py-1 rounded-sm'>WPM: {stats.wpm}</span>
        <span className='bg-white text-black px-2 py-1 rounded-sm'>Precisão: {stats.accuracy}</span>
        <span className='bg-white text-black px-2 py-1 rounded-sm'>Erros: {stats.errorCount}</span>

        <div>
          <span className='text-4xl'>{seconds}</span>
        </div>
      </div>

      <div>
        {
          originalText.split("").map((originalLetter, i) => {
            // console.log(userInput)
            let cor;
            if (i < userInput.length) {
              userInput[i] === originalLetter ? cor = "text-green-500" : cor = "text-red-500"
            }

            return (
              <span
                key={i}
                className={`text-gray-300 ${cor}`}
              >
                {originalLetter}
              </span>
            )
          })
        }

        <p>{userInput}</p>
      </div>

      <input
        className='border'
        type="text"
        value={userInput}
        onChange={(e) => {
          setUserInput(e.target.value)

          const currentText = e.target.value
          const index = currentText.length - 1

          handleChangeStatus(currentText)
          
          if (currentText.length > userInput.length) {
            currentText[index] !== originalText[index]
              ?
              setStats({ ...stats, errorCount: stats.errorCount + 1 })
              :
              ""
          } else {
            ""
            // console.log('nenhum erro')
          }
        }}
        disabled={gameStatus === 'finished' ? true : false}
      />
    </div>
  )
}

export default App
