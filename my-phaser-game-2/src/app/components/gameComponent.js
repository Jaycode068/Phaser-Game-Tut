"use client";
import { useEffect } from 'react';
import * as Phaser from 'phaser';
import GameIntro from '../scenes/gameIntro' // Import GameIntro scene
import Game from '../scenes/game'; // Import Game scene
import GameOver from '../scenes/gameOver'; // Import GameOver scene

const GameComponent = () => {
  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 600,
      height: 300,
      parent: 'game-container',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 350 },
          debug: true,
        },
      },
      scene: [GameIntro, Game, GameOver],  // Add all the scenes
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);  // Clean up when component unmounts
    };
  }, []);

  return <div id="game-container"></div>;
};

export default GameComponent;
