import * as Phaser from 'phaser';
import { preload, create, update } from '../game-functions/gameFunction';

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
    update: update
  },
};

export default config;
