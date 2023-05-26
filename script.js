$(document).ready(function() {
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
  $("#image-select").change(function() {
    let selectedImage = $(this).val();
    let selectedDifficulty = $("#difficulty-select").val();
    loadPuzzlePieces(selectedImage, selectedDifficulty);
  });

  // Початкова загрузка пазлу
  let selectedImage = $("#image-select").val();
  let selectedDifficulty = $("#difficulty-select").val();
  loadPuzzlePieces(selectedImage, selectedDifficulty);

  // Функція, яка перевіряє, чи пазл був складений правильно
  function checkPuzzleCompletion() {
    let completed = true;

    // Перевірка, чи всі фрагменти пазлу знаходяться на своїх місцях
    for (let i = 0; i < imagePieces.length; i++) {
      let piece = imagePieces[i];
      let correctPosition = getPiecePosition(i, imagePieces.length);
      let currentLeft = parseInt(piece.style.left);
      let currentTop = parseInt(piece.style.top);

      if (currentLeft !== correctPosition.x || currentTop !== correctPosition.y) {
        completed = false;
        break;
      }
    }

    // Виведення повідомлення про успішне завершення пазла
    if (completed) {
      alert("Ви склали пазл!");
    }
  }

  // Додавання обробників подій для перетягування та відпускання фрагментів пазлу
  $("#puzzle-container").on("mousedown", ".puzzle-piece", function(event) {
    let piece = $(this);

    // Зберігаємо початкові координати фрагмента та зберігаємо їх у даних події
    let initialX = event.pageX - parseInt(piece.css("left"));
    let initialY = event.pageY - parseInt(piece.css("top"));
    piece.data("initialX", initialX);
    piece.data("initialY", initialY);

    // Позначаємо фрагмент як активний
    piece.addClass("active");
  });

  $("#puzzle-container").on("mousemove", function(event) {
    let activePiece = $(".active");

    if (activePiece.length) {
      // Встановлюємо нові координати фрагмента на основі руху миші
      let initialX = activePiece.data("initialX");
      let initialY = activePiece.data("initialY");
      let newX = event.pageX - initialX;
      let newY = event.pageY - initialY;

      activePiece.css({
        left: newX + "px",
        top: newY + "px"
      });
    }
  });

  $("#puzzle-container").on("mouseup", function() {
    let activePiece = $(".active");

    if (activePiece.length) {
      // Знімаємо позначку активного фрагмента
      activePiece.removeClass("active");

      // Перевіряємо, чи пазл був складений правильно після переміщення фрагменту
      checkPuzzleCompletion();
    }
  });
});

