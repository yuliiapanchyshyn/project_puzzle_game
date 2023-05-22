let imagePieces = []; // Масив для збереження фрагментів пазлу

    // Завантаження фрагментів пазлу
    function loadPuzzlePieces(imagePath, difficulty) {
        let container = document.getElementById("puzzle-container");
      container.innerHTML = "";

      let numPieces = 4; // Кількість фрагментів пазлу для кожного рівня складності
      if (difficulty === "medium") {
        numPieces = 9;
      } else if (difficulty === "hard") {
        numPieces = 16;
      }

      // Завантаження фрагментів зображення
      for (let i = 0; i < numPieces; i++) {
        let piece = document.createElement("div");
        piece.className = "puzzle-piece";
        piece.style.backgroundImage = "url(" + imagePath + ")";
        piece.style.backgroundPosition = getPieceBackgroundPosition(i, numPieces);
        piece.style.left = getPiecePosition(i, numPieces).x + "px";
        piece.style.top = getPiecePosition(i, numPieces).y + "px";
        container.appendChild(piece);
        imagePieces.push(piece);
      }
    }

    // Отримання позиції для фрагмента пазлу
    function getPiecePosition(index, numPieces) {
        let gridSize = Math.sqrt(numPieces);
        let pieceSize = 500 / gridSize;
        let x = (index % gridSize) * pieceSize;
        let y = Math.floor(index / gridSize) * pieceSize;
        return { x: x, y: y };
      }
      // Отримання позиції фону для фрагмента пазлу
function getPieceBackgroundPosition(index, numPieces) {
    let gridSize = Math.sqrt(numPieces);
    let pieceSize = 500 / gridSize;
    let backgroundX = -((index % gridSize) * pieceSize);
    let backgroundY = -Math.floor(index / gridSize) * pieceSize;
    return backgroundX + "px " + backgroundY + "px";
  }
  
  // Обробник події для вибору зображення та рівня складності
  document.getElementById("image-select").addEventListener("change", function() {
    let selectedImage = this.value;
    let selectedDifficulty = document.getElementById("difficulty-select").value;
    loadPuzzlePieces(selectedImage, selectedDifficulty);
  });