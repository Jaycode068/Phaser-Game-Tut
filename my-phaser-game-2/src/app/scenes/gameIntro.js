import * as Phaser from 'phaser';

class GameIntro extends Phaser.Scene {
  constructor() {
    super({ key: 'GameIntro' });
  }

  create() {
    const titleText = this.add.text(300, 150, 'Welcome to runner game!', { fontSize: '38px', fill: '#fff' });
    titleText.setOrigin(0.5);

    const startText = this.add.text(300, 250, 'Click to Start', { fontSize: '22px', fill: '#fff' });
    startText.setOrigin(0.5);

    // Start the game on click
    this.input.once('pointerdown', () => {
      this.scene.start('Game');  // Switch to the main game scene
    });
  }
}

export default GameIntro;
