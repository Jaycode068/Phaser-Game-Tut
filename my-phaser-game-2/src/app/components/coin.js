// src/app/components/coin.js
export default class Coin extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
      super(scene, x, y, "coin");
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setAllowGravity(false);
      this.init();
  }

  init() {
      // Tween animation for the coin's movement across the screen
      this.scene.tweens.add({
          targets: this,
          x: { from: 820, to: -100 },
          duration: 2000,
          onComplete: () => {
              this.destroy();
          },
      });

      // Create the coin animation if it doesn't exist already
      const coinAnimation = this.scene.anims.create({
          key: "coin",
          frames: this.scene.anims.generateFrameNumbers("coin", {
              start: 0,
              end: 7,
          }),
          frameRate: 8,
          repeat: -1,
      });

      // Play the coin animation
      this.play({ key: "coin", repeat: -1 });
  }
}
