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

  const originalText = "paralelepipedo"

  return (
    <div className='p-5'>
      <h1 className='font-bold'>Type Racer</h1>

      <div className='flex flex-wrap items-center justify-center gap-3 font-bold mb-8'>
        <span className='bg-white text-black px-2 py-1 rounded-sm'>WPM: {stats.wpm}</span>
        <span className='bg-white text-black px-2 py-1 rounded-sm'>Precisão: {stats.accuracy}</span>
        <span className='bg-white text-black px-2 py-1 rounded-sm'>Erros: {stats.errorCount}</span>
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
          
          if (currentText.length > userInput.length) {
            currentText[index] !== originalText[index] ? setStats({ ...stats, errorCount: stats.errorCount + 1 }) : ""
          } else {
            console.log('nenhum erro')
          }
        }}
      />
    </div>
  )
}

export default App
