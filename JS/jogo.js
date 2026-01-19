document.addEventListener("DOMContentLoaded", () => {

  const game = document.getElementById("game");
  const player = document.getElementById("player");
  const scoreSpan = document.getElementById("score");

  const btnLeft = document.getElementById("btnLeft");
  const btnRight = document.getElementById("btnRight");
  const btnStart = document.getElementById("btnStart");
  const btnEnd = document.getElementById("btnEnd");
  const btnMenu = document.getElementById("btnMenu");

  let score = 0;
  let speed = 3;
  let gameRunning = false;
  let enemyTimer;

  // ===== BOTÕES =====
  btnLeft.addEventListener("click", moveLeft);
  btnRight.addEventListener("click", moveRight);
  btnStart.addEventListener("click", startGame);
  btnEnd.addEventListener("click", endGame);
  btnMenu.addEventListener("click", menu);

  // ===== MOVIMENTO =====
  function moveLeft() {
    if (!gameRunning) return;
    let left = player.offsetLeft;
    if (left > 0) {
      player.style.left = left - 20 + "px";
    }
  }

  function moveRight() {
    if (!gameRunning) return;
    let left = player.offsetLeft;
    if (left < 260) {
      player.style.left = left + 20 + "px";
    }
  }

  // ===== CONTROLE =====
  function startGame() {
    if (gameRunning) return;

    clearEnemies();
    score = 0;
    speed = 3;
    scoreSpan.innerText = score;
    gameRunning = true;

    enemyTimer = setInterval(createEnemy, 1500);
  }

  function endGame() {
    if (!gameRunning) return;
    gameRunning = false;
    clearInterval(enemyTimer);
    alert("Game Over!");
  }

  function menu() {
    window.location.href = "menu.html";
  }

  // ===== INIMIGOS =====
  function createEnemy() {
    if (!gameRunning) return;

    const enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.style.left = Math.random() < 0.5 ? "80px" : "180px";
    game.appendChild(enemy);

    const enemyMove = setInterval(() => {
      if (!gameRunning) {
        clearInterval(enemyMove);
        enemy.remove();
        return;
      }

      enemy.style.top = enemy.offsetTop + speed + "px";

      if (checkCollision(enemy)) {
        clearInterval(enemyMove);
        endGame();
      }

      if (enemy.offsetTop > 500) {
        clearInterval(enemyMove);
        enemy.remove();
        score++;
        speed += 0.2; // aceleração
        scoreSpan.innerText = score;
      }
    }, 20);
  }

  // ===== COLISÃO =====
  function checkCollision(enemy) {
    const p = player.getBoundingClientRect();
    const e = enemy.getBoundingClientRect();

    return !(
      p.bottom < e.top ||
      p.top > e.bottom ||
      p.right < e.left ||
      p.left > e.right
    );
  }

  // ===== LIMPEZA =====
  function clearEnemies() {
    document.querySelectorAll(".enemy").forEach(e => e.remove());
  }

});
