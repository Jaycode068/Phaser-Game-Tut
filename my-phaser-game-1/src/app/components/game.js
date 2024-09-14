"use client"; // Ensures the component is client-side only

import { useEffect } from 'react';
import * as Phaser from 'phaser';

const Game = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') { // Ensure this only runs on the client side
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 300 },
              debug: false
          }
      },
        parent: 'phaser-game',
        scene: {
          preload: preload,
          create: create,
          update: update,
        },
      };

      // Create a new Phaser game instance
      const game = new Phaser.Game(config);

      let player;
      let cursors;
      let jumpKey;
      let stars;
      let scoreText;
      let bombs;
      let gameOver = false;


      function preload (){
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude',
            'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
        );
      }

      function create (){
          this.add.image(400, 300, 'sky');

          // Initialising Platforms
          const platforms = this.physics.add.staticGroup();
          player = this.physics.add.sprite(100, 450, 'dude');
          cursors = this.input.keyboard.createCursorKeys();
          jumpKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
          let score = 0;
          scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
          bombs = this.physics.add.group();
  
          

          platforms.create(400, 568, 'ground').setScale(2).refreshBody();

          platforms.create(600, 400, 'ground');
          platforms.create(50, 250, 'ground');
          platforms.create(750, 220, 'ground');

          
          player.setBounce(0.2);
          player.setCollideWorldBounds(true);

          this.anims.create({
              key: 'left',
              frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
              frameRate: 10,
              repeat: -1
          });

          this.anims.create({
              key: 'turn',
              frames: [ { key: 'dude', frame: 4 } ],
              frameRate: 20
          });

          this.anims.create({
              key: 'right',
              frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
              frameRate: 10,
              repeat: -1
          });
          this.physics.add.collider(player, platforms);

          stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });
        
        stars.children.iterate(function (child) {
        
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);

        function collectStar (player, star){
            star.disableBody(true, true);

            score += 10;
            scoreText.setText('Score: ' + score);

            if (stars.countActive(true) === 0){
              stars.children.iterate(function (child) {
      
                  child.enableBody(true, child.x, 0, true, true);
      
              });
      
              let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
      
              let bomb = bombs.create(x, 16, 'bomb');
              bomb.setBounce(1);
              bomb.setCollideWorldBounds(true);
              bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        
            }
        }

        this.physics.add.collider(bombs, platforms);

        this.physics.add.collider(player, bombs, hitBomb, null, this);

        function hitBomb (player, bomb){
          this.physics.pause();

          player.setTint(0xff0000);

          player.anims.play('turn');

          gameOver = true;
        }

      }

      function update() {
        if (cursors.left.isDown)
          {
              player.setVelocityX(-160);
          
              player.anims.play('left', true);
          }
          else if (cursors.right.isDown)
          {
              player.setVelocityX(160);
          
              player.anims.play('right', true);
          }
          else
          {
              player.setVelocityX(0);
          
              player.anims.play('turn');
          }
          
          if (jumpKey.isDown && player.body.touching.down)
          {
              player.setVelocityY(-330);
          }
      }

      return () => {
        game.destroy(true); // Clean up the Phaser game instance
      };
    }
  }, []);

  return <div id="phaser-game"></div>; // Div to render the Phaser game
};

export default Game;
