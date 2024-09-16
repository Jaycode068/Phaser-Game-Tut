// src/app/components/generator.js
import Cloud from './cloud';
import Obstacle from './obstacle';
import Coin from './coin'; // Assuming you have a Coin class

export default class Generator {
    constructor(scene) {
        this.scene = scene;
        this.scene.time.delayedCall(2000, () => this.init(), null, this);
    }

    init() {
        this.generateCloud();
        this.generateObstacle();
        this.generateCoin();
    }

    generateCloud() {
        new Cloud(this.scene, 800);
        this.scene.time.delayedCall(
            Phaser.Math.Between(2000, 3000),
            () => this.generateCloud(),
            null,
            this
        );
    }

    generateObstacle() {
        this.scene.obstacles.add(
            new Obstacle(this.scene, 800, this.scene.height - Phaser.Math.Between(32, 128))
        );
        this.scene.time.delayedCall(
            Phaser.Math.Between(1500, 2500),
            () => this.generateObstacle(),
            null,
            this
        );
    }

    generateCoin() {
        // Create a new coin and add it to the physics system
        const coin = new Coin(this.scene, 800, this.scene.height - Phaser.Math.Between(32, 128));
        
        // Add the coin to the coins group so that it can be detected for overlap
        this.scene.coins.add(coin);
        
        this.scene.time.delayedCall(
            Phaser.Math.Between(500, 1500),
            () => this.generateCoin(),
            null,
            this
        );
    }
    
}
