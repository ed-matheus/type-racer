import { useEffect, useState } from 'react'
import './App.css'

// Importando dados de "types.ts"
import type { GameStatus, StatProps } from './types';
import InfoCard from './components/InfoCard';

// Ícones
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

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

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')

  // Frase ou palavra a ser digitada pelo usuário
  const originalText = "jogar bola é sensacional. nosto do neymar."

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
      const textLength = originalText.length / 5
      // Calculando wpm (words per minute)
      const wpm = (textLength) / (seconds / 60)
      console.log(wpm)

      // Calculando accuracy (precisão)
      const accuracy = 100 - ((stats.errorCount / originalText.length) * 100)

      setStats(() => ({
        ...stats, 
        wpm: wpm,
        accuracy: accuracy
      }))
    }

    return () => {
      if (interval) {
        clearInterval(interval)

        const newStatus = 'finished'
        setGameStatus(newStatus)
      }
    }
  }, [gameStatus])

  useEffect(() => {
    if (theme === 'dark') {
      localStorage.setItem('theme', theme)
    } else {
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return (
    <div className={`px-10 py-8 flex flex-col justify-start items-center h-screen ${theme === 'light' ? 'bg-[#f0f0f0] text-[#242424] ' : 'bg-[#242424]'}`}>
      {/* Botão para trocar de tema (escuro e claro) */}
      <button onClick={() => {
        theme === 'light' ? setTheme('dark') : setTheme('light')
      }}>
        {
          theme === 'dark' ? <IoSunnyOutline size={25} /> : <IoMoonOutline size={25} />
        }
      </button>

      <h1 className='font-bold text-blue-500'>Type Racer</h1>

      <div className='flex flex-col items-center justify-center gap-3 font-bold mb-8'>
        <div className='flex flex-wrap justify-center gap-3 text-blue-500'>
          <InfoCard statsName={'WPM'} stats={stats.wpm.toFixed(0)} currentTheme={theme} />
          <InfoCard statsName={'Precisão'} stats={`${stats.accuracy.toFixed(1)}%`} currentTheme={theme} />
          <InfoCard statsName={'Erros'} stats={stats.errorCount} currentTheme={theme} />
        </div>

        <div className='flex flex-col mt-5'>
          Tempo:
          <span className='text-4xl'>{seconds}</span>
        </div>
      </div>

      {/* Frase */}
      <div>
      {/* Frase original */}
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
                className={`${theme === 'light' ? 'text-gray-600 ' : 'text-gray-300'} ${cor} font-mono`}
              >
                {originalLetter}
              </span>
            )
          })
        }

        {/* Frase digitada */}
        <p className={`font-mono ${theme === 'light' ? 'text-gray-600 ' : ''}`}>{userInput}</p>
      </div>

      {/* Campo de digitação */}
      <div className='flex flex-col gap-15 mt-2'>
        <input
          className={`border-2 rounded-md p-2 focus:outline-2 focus:border-0 focus:outline-blue-500 ${theme === 'light' ? 'border-[#242424] text-[#242424]' : ''}`}
          type="text"
          placeholder='Comece a digitar...'
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

        {/* Botão de 'jogar de novo' */}
        {
          gameStatus === 'finished'
            ?
            <button
              className='px-5 py-3 bg-blue-600 rounded-md font-bold'
              onClick={() => {
                setUserInput("")
                setSeconds(0)
                setGameStatus('waiting')
                setStats(() => ({
                  ...stats, 
                  wpm: 0,
                  accuracy: 0,
                  errorCount: 0
                }))
              }}
            >
              Jogar Novamente
            </button>
            :
            ''
        }
      </div>
    </div>
  )
}

export default App
