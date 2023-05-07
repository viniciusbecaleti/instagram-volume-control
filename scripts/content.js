const concertedVideos = []

// Função de callback para executar quando uma mutação for observada
const mutationCallback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      // Verifica se o elemento desejado foi adicionado ao DOM
      const videos = mutation.target.querySelectorAll('video');
      
      if (videos.length != 0) {
        for (const video of videos) {
          if (!concertedVideos.includes(video)) {
            video.volume = 0.5

            const nextElement = video.nextSibling
            const muteButton = nextElement.querySelector("button")

            const inputRange = document.createElement("input")
            inputRange.setAttribute("type", "range")
            inputRange.setAttribute("min", "0")
            inputRange.setAttribute("max", "100")
            inputRange.setAttribute("value", "50")
            inputRange.style.marginRight = "12px"
            inputRange.style.maxWidth = "90px"

            const buttonContainer = muteButton.parentNode
            buttonContainer.style.display = "inline"

            buttonContainer.insertBefore(inputRange, muteButton)

            inputRange.addEventListener("input", () => {
              video.volume = inputRange.value / 100
            })

            concertedVideos.push(video)
          }
        }
      }
    }
  }
};

// Cria uma instância do MutationObserver com a função de callback
const observer = new MutationObserver(mutationCallback);

// Opções de observação para o MutationObserver
const observerOptions = {
  childList: true, // Observar mudanças nos filhos do elemento observado
  subtree: true, // Observar mudanças em todo o subárvore do elemento observado
};

// Elemento no qual deseja observar mutações
const targetNode = document.body; // Ou qualquer outro elemento específico

// Inicia a observação passando o elemento alvo e as opções de observação
observer.observe(targetNode, observerOptions);
