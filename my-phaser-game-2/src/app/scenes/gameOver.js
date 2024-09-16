import * as Phaser from 'phaser';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOver' }); // Use 'GameOver' to match scene key conventions
  }

  create() {
    // Retrieve game dimensions
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    // Set background color
    this.cameras.main.setBackgroundColor(0x87ceeb);

    // Display the final score
    this.add
      .bitmapText(
        this.center_width,
        100,
        'arcade',
        `Score: ${this.registry.get('score')}`,
        25
      )
      .setOrigin(0.5);

    // Display "GAME OVER" text
    this.add
      .bitmapText(
        this.center_width,
        this.center_height,
        'arcade',
        'GAME OVER',
        45
      )
      .setOrigin(0.5);

    // Display instructions to restart
    this.add
      .bitmapText(
        this.center_width,
        this.center_height + 50,
        'arcade',
        'Press SPACE or Click to Restart!',
        15
      )
      .setOrigin(0.5);

    // Set up input handlers for restarting the game
    this.input.keyboard.on('keydown-SPACE', this.startGame, this);
    this.input.on('pointerdown', this.startGame, this);
  }

  startGame() {
    // Restart the Game scene
    this.scene.start('Game'); // Ensure 'Game' matches your main game scene key
  }
}
