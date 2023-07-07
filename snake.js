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

            if (foodCounter >= 7) {
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
            // Reload the page to start the game again
            location.reload();
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
    
        // Get the position of the touch event
        let touchX = e.touches[0].clientX;
        let touchY = e.touches[0].clientY;
    
        // Get the position of the snake's head
        let snakeHeadX = snake[0].left + gameArea.offsetLeft;
        let snakeHeadY = snake[0].top + gameArea.offsetTop;
    
        // Determine the direction based on the relative position of the touch event
        if (Math.abs(touchX - snakeHeadX) > Math.abs(touchY - snakeHeadY)) {
            // The touch event was either to the left or to the right of the snake's head
            if (touchX > snakeHeadX) {
                // The touch event was to the right of the snake's head
                if (direction !== 'LEFT') direction = 'RIGHT';
            } else {
                // The touch event was to the left of the snake's head
                if (direction !== 'RIGHT') direction = 'LEFT';
            }
        } else {
            // The touch event was either above or below the snake's head
            if (touchY > snakeHeadY) {
                // The touch event was below the snake's head
                if (direction !== 'UP') direction = 'DOWN';
            } else {
                // The touch event was above the snake's head
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
