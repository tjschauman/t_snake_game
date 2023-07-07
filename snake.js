document.addEventListener('DOMContentLoaded', (event) => {
    // Game logic starts here
    let dotSize = 20;
    let direction = 'RIGHT';
    let gameArea = document.getElementById('gameArea');
    let food = null;
    let snake = [{ top: 0, left: 0 }];
    let foodCounter = 0;

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

        let left = Math.floor(Math.random() * (gameArea.offsetWidth - dotSize) / dotSize) * dotSize;
        let top = Math.floor(Math.random() * (gameArea.offsetHeight - dotSize) / dotSize) * dotSize;

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

        // Display the scary image
        let img = document.createElement('img');
        img.src = 'scary.jpg'; // Path to the scary image
        img.style.width = '100%';
        img.style.height = '100%';
        gameArea.innerHTML = '';
        gameArea.appendChild(img);
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
