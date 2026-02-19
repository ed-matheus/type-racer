# 🏎️ Type Racer Tech

Um desafio de digitação focado em performance e precisão, desenvolvido para entusiastas de tecnologia e entusiastas de código. O projeto foca em uma experiência de usuário (UX) fluida e feedback em tempo real.

## 🚀 Tecnologias
* **React 19** com **Vite**
* **TypeScript** para tipagem estática e segurança de dados
* **Tailwind CSS** para um design moderno e responsivo
* **Lucide React** para ícones intuitivos
* **LocalStorage** para persistência de preferências de tema

## 🛠️ Funcionalidades Principais
* **Cálculo de WPM (Palavras por Minuto)**: Baseado na convenção internacional de 5 caracteres por palavra.
* **Medidor de Precisão**: Feedback imediato sobre a porcentagem de acerto durante a digitação.
* **Contador de Erros**: Identifica falhas em tempo real, bloqueando a contagem de erros ao apagar (Backspace).
* **Dark Mode Nativo**: Alternância de temas com persistência local (LocalStorage).
* **Banco de Frases Local**: Sistema de sorteio aleatório de frases sobre ciência, universo e tecnologia.
* **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela usando `textarea` para melhor fluxo de texto.

## 🧠 Desafios de Lógica Superados
Durante o desenvolvimento, foquei em resolver problemas complexos de sincronização no React:
1. **Gerenciamento de Ciclo de Vida**: Uso estratégico de `useEffect` para controlar o cronômetro (`setInterval`) e limpeza de memória (`clearInterval`).
2. **Lógica de Comparação**: Algoritmo que compara a entrada do usuário com o texto original apenas em avanços de caracteres, evitando contagens errôneas de erro ao corrigir o texto.
3. **Estados Complexos**: Organização de múltiplos estados (7 ao total) garantindo performance e legibilidade do código.
