document.addEventListener('DOMContentLoaded', (event) => {
    // Game logic starts here
    let dotSize = 20;
    let columns = Math.floor(window.innerWidth * 0.85 / dotSize);
    let rows = Math.floor(window.innerHeight * 0.65 / dotSize);
    let direction = 'RIGHT';
    let gameArea = document.getElementById('gameArea');
    let food = null;
    let snake = [{ top: 0, left: 0 }];
    let foodCounter = 0;
    gameArea.style.width = (columns * dotSize) + 'px';
    gameArea.style.height = (rows * dotSize) + 'px';

    let gameInterval = setInterval(function () {
        let snakeHead = { ...snake[0] }; // Copy head

        switch (direction) {
            case 'RIGHT':
                snakeHead.left += dotSize;
                break;
            case 'DOWN':
                snakeHead.top += dotSize;
                break;
            case 'LEFT':
                snakeHead.left -= dotSize;
                break;
            case 'UP':
                snakeHead.top -= dotSize;
                break;
        }

        // Game over condition if the snake hits the game area boundary
        if (snakeHead.left < 0 || snakeHead.top < 0 || snakeHead.left >= gameArea.offsetWidth || snakeHead.top >= gameArea.offsetHeight) {
            gameOver();
        }

        snake.unshift(snakeHead); // Add new head to snake

        // Snake ate food
        if (food && food.style.top === snakeHead.top + 'px' && food.style.left === snakeHead.left + 'px') {
            food.remove();
            food = null;
            foodCounter++;

            if (foodCounter >= 5) {
                gameOver();
            }
        } else {
            // Remove tail
            let tail = snake.pop();
            let tailElement = document.getElementById(tail.top + '-' + tail.left);
            if (tailElement) {
                tailElement.remove();
            }
        }

        if (drawDot(snakeHead.top, snakeHead.left)) {
            gameOver();
        }

        drawFood();

    }, 200);

    function drawDot(top, left) {
        if (document.getElementById(top + '-' + left)) {
            // Game over
            return true;
        }

        let dot = document.createElement('div');

        dot.style.top = `${top}px`;
        dot.style.left = `${left}px`;
        dot.className = 'dot';
        dot.id = top + '-' + left;

        gameArea.appendChild(dot);
    }

    function drawFood() {
        if (food) return;
    
        let left = Math.floor(Math.random() * columns) * dotSize;
        let top = Math.floor(Math.random() * rows) * dotSize;
    
        if (document.getElementById(top + '-' + left)) {
            return drawFood();
        }
    
        food = document.createElement('div');
        food.style.top = `${top}px`;
        food.style.left = `${left}px`;
        food.className = 'food';
    
        gameArea.appendChild(food);
    }

    function gameOver() {
        clearInterval(gameInterval);
    
        // Display the game over message
        let gameOverMessage = document.createElement('h2');
        gameOverMessage.textContent = 'Game Over!';
        gameOverMessage.style.color = 'white';
        gameOverMessage.style.position = 'absolute';
        gameOverMessage.style.top = '50%';
        gameOverMessage.style.left = '50%';
        gameOverMessage.style.transform = 'translate(-50%, -50%)';
        gameOverMessage.style.textAlign = 'center';
    
        // Create the restart button
        let restartButton = document.createElement('button');
        restartButton.textContent = 'Restart';
        restartButton.style.position = 'absolute';
        restartButton.style.top = '60%';
        restartButton.style.left = '50%';
        restartButton.style.transform = 'translate(-50%, -50%)';
        restartButton.style.padding = '10px 20px';
    
        // Set the restart button behavior
        restartButton.addEventListener('click', function() {
            // Display the scary image
            let img = document.createElement('img');
            img.src = 'scary.jpg'; // Path to the scary image
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            img.style.objectFit = 'cover';
            gameArea.innerHTML = '';
            gameArea.appendChild(img);
    
            setTimeout(function() {
                // Reload the page to start the game again
                location.reload();
            }, 2000); // Delay before restarting the game
        });
    
        gameArea.innerHTML = '';
        gameArea.appendChild(gameOverMessage);
        gameArea.appendChild(restartButton);
    }
    

    window.addEventListener('keydown', function(e) {
        switch (e.key) {
            case 'ArrowUp':
                if (direction !== 'DOWN') direction = 'UP';
                break;
            case 'ArrowRight':
                if (direction !== 'LEFT') direction = 'RIGHT';
                break;
            case 'ArrowDown':
                if (direction !== 'UP') direction = 'DOWN';
                break;
            case 'ArrowLeft':
                if (direction !== 'RIGHT') direction = 'LEFT';
                break;
        }
    });

    gameArea.addEventListener('touchstart', function(e) {
        e.preventDefault();  // This may help iOS register the touch events
    
        // Get the position of the touch event relative to the center of the gameArea
        let touchX = e.touches[0].clientX - gameArea.offsetWidth / 2;
        let touchY = e.touches[0].clientY - gameArea.offsetHeight / 2;
    
        // Determine the direction of the snake based on the position of the touch event
        if (Math.abs(touchX) > Math.abs(touchY)) {
            // The touch event was either to the left or to the right of the center of the gameArea
            if (touchX > 0) {
                // The touch event was to the right of the center of the gameArea
                if (direction !== 'LEFT') direction = 'RIGHT';
            } else {
                // The touch event was to the left of the center of the gameArea
                if (direction !== 'RIGHT') direction = 'LEFT';
            }
        } else {
            // The touch event was either above or below the center of the gameArea
            if (touchY > 0) {
                // The touch event was below the center of the gameArea
                if (direction !== 'UP') direction = 'DOWN';
            } else {
                // The touch event was above the center of the gameArea
                if (direction !== 'DOWN') direction = 'UP';
            }
        }
    }, { passive: false });  // The passive option is set to false to prevent scrolling while this event is happening


    
    document.getElementById('btnUp').addEventListener('click', function() {
        if (direction !== 'DOWN') direction = 'UP';
    });
    
    document.getElementById('btnRight').addEventListener('click', function() {
        if (direction !== 'LEFT') direction = 'RIGHT';
    });
    
    document.getElementById('btnDown').addEventListener('click', function() {
        if (direction !== 'UP') direction = 'DOWN';
    });
    
    document.getElementById('btnLeft').addEventListener('click', function() {
        if (direction !== 'RIGHT') direction = 'LEFT';
    });
    // Game logic ends here
});
