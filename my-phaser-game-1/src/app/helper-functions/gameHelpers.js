import { setGameOver } from '../game-functions/gameFunction'; // Import the function to set gameOver state

let score = 0;

export function collectStar(player, star, stars, bombs, scoreText) {
  star.disableBody(true, true);

  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    const bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}

export function hitBomb(player, bomb, scene) {
  scene.physics.pause();

  player.setTint(0xff0000); // Player turns red

  player.anims.play('turn'); // Play the 'turn' animation (idle animation)

  setGameOver(true); // Call the function to set gameOver to true
}
