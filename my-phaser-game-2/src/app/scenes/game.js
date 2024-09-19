import * as Phaser from 'phaser';
import Player from '../components/player'; // Assuming Player class is defined elsewhere
import Generator from '../components/generator'; // Assuming Generator class is defined elsewhere

class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'Game' });
    this.player = null;
    this.score = 0;
    this.scoreText = null;
    this.jumpTween = null;
    this.music = null;
    this.audios = {};
    this.updateScoreEvent = null;
  }

  preload() {
    this.load.audio("coin", "assets/sounds/coin.mp3");
    this.load.audio("jump", "assets/sounds/jump.mp3");
    this.load.audio("dead", "assets/sounds/dead.mp3");
    this.load.audio("theme", "assets/sounds/theme.mp3");
    this.load.spritesheet("coin", "./assets/images/coin.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image('cloud', 'assets/images/cloud.png');
    this.load.bitmapFont("arcade", "assets/fonts/arcade.png", "assets/fonts/arcade.xml");
  }

  create() {
    // Set up the game world
    this.setupWorld();

    // Initialize the player, obstacles, and coins
    this.player = new Player(this, this.center_width - 100, this.height - 200);
    this.obstacles = this.add.group();
    this.coins = this.add.group();

    // Instantiate the Generator to create game objects
    this.generator = new Generator(this);

    // Add keyboard and pointer input events
    this.SPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.input.on("pointerdown", (pointer) => this.jump(), this);

    // Add physics interactions
    this.setupCollisions();

    // Load and play audio
    this.loadAudios();
    this.playMusic();

    // Initialize score updating over time
    this.updateScoreEvent = this.time.addEvent({
      delay: 100,
      callback: () => this.updateScore(10), // Increment score every 100ms
      callbackScope: this,
      loop: true,
    });
  }

  setupWorld() {
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;
    this.center_width = this.width / 2;
    this.center_height = this.height / 2;

    // Set the background color to sky blue
    this.cameras.main.setBackgroundColor(0x87ceeb);

    // Initialize score and display it
    this.score = 0;
    this.scoreText = this.add.bitmapText(
      this.center_width,
      10,
      "arcade",
      this.score,
      20
    ).setOrigin(0.5, 0);
  }

  setupCollisions() {
    // Handle collisions between player and obstacles
    this.physics.add.collider(
      this.player,
      this.obstacles,
      this.hitObstacle,
      null,
      this
    );

    // Handle overlaps between player and coins
    this.physics.add.overlap(
      this.player,
      this.coins,
      this.hitCoin,
      null,
      this
    );
  }

  loadAudios() {
    this.audios = {
      jump: this.sound.add("jump"),
      coin: this.sound.add("coin"),
      dead: this.sound.add("dead"),
    };
  }

  playAudio(key) {
    if (this.audios[key]) {
      this.audios[key].play();
    }
  }

  playMusic(theme = "theme") {
    this.theme = this.sound.add(theme);
    if (this.theme.isPlaying) {
      this.theme.stop();
    }
    this.theme.play({
      mute: false,
      volume: 1,
      rate: 1,
      loop: true,
    });
  }

  update() {
    // Jump when SPACE is pressed
    if (Phaser.Input.Keyboard.JustDown(this.SPACE)) {
      this.jump();
    } else if (this.player.body.blocked.down) {
      // Reset rotation when player lands on the ground
      this.jumpTween?.stop();
      this.player.rotation = 0;
    }
  }

  jump() {
    // Only jump if the player is touching the ground
    if (!this.player.body.blocked.down) return;

    // Apply upward velocity for the jump
    this.player.body.setVelocityY(-300);

    // Play the jump sound
    this.playAudio("jump");

    // Add a rotation effect during the jump
    this.jumpTween = this.tweens.add({
      targets: this.player,
      duration: 1000,
      angle: { from: 0, to: 360 },
      repeat: -1, // Keep rotating during the jump
    });
  }

  hitCoin(player, coin) {
    // Handle player collecting a coin
    this.playAudio('coin');
    this.updateScore(1000); // Add 1000 points when a coin is collected
    coin.destroy();
  }

  hitObstacle(player, obstacle) {
    // Handle collision with obstacle (end the game)
    this.playAudio('dead');
    this.updateScoreEvent.destroy(); // Stop the score from updating
    this.finishScene(); // Handle ending the scene
  }

  updateScore(amount = 0) {
    // Update score and display
    this.score += amount;
    this.scoreText.setText(this.score);
  }

  finishScene() {
    // Stop the background music
    this.theme.stop();
    
    // Play the "dead" sound effect
    this.playAudio("dead");

    // Save the score in the registry for the next scene
    this.registry.set("score", "" + this.score);

    // Start the Game Over scene
    this.scene.start("GameOver");
  }
}

export default Game;