//1. O 'type' aqui funciona como uma lista de opções permitidas.
// O TypeScript vai dar erro se tentar definir o status como 'jogando', por exemplo.
export type GameStatus = 'waiting' | 'typing' | 'finished';

// 2. A 'interface' define o formato (a forma) de um objeto.
// É como se fosse uma planta de uma casa: você diz o que tem que ter dentro.
export interface StatProps {
  wpm: number;
  accuracy: number;
  errorCount: number;
}

export interface SentenceProps {
  id: number;
  text: string;
  theme: string;
}