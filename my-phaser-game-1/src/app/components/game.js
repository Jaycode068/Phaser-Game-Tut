"use client";
import { useEffect } from 'react';
import Phaser from 'phaser';
import config from '../config-files/config';

const Game = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const game = new Phaser.Game(config);

      return () => {
        game.destroy(true); // Clean up the Phaser game instance
      };
    }
  }, []);

  return <div id="phaser-game"></div>;
};

export default Game;
