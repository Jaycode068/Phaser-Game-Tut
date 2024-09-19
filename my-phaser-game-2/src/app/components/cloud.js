// src/app/components/cloud.js
export default class Cloud extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
      const finalY = y || Phaser.Math.Between(0, 100);
      super(scene, x, finalY, 'cloud');
      scene.add.existing(this);
      const alpha = 1 / Phaser.Math.Between(1, 3);
      this.setScale(alpha);
      this.init();
  }

  init() {
      this.scene.tweens.add({
          targets: this,
          x: { from: 800, to: -100 },
          duration: 2000 / this.scale,
          onComplete: () => {
              this.destroy();
          },
      });
  }
}
