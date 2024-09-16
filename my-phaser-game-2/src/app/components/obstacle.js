// src/app/components/obstacle.js
export default class Obstacle extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y) {
      super(scene, x, y, 32, 32, 0xff0000);
      scene.add.existing(this);
      scene.physics.add.existing(this);
      this.body.setAllowGravity(false);
      this.init();
  }

  init() {
      this.scene.tweens.add({
          targets: this,
          x: { from: 820, to: -100 },
          duration: 2000,
          onComplete: () => {
              this.destroy();
          },
      });
  }
}
