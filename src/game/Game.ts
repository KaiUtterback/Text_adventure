import { World } from './World';
import { Player } from './Player';
import { version } from '../../package.json';

export class Game {
  world: World;
  player: Player;
  version: string;

  constructor() {
    console.log(`\n\n\n`);
    this.world = new World();
    this.player = new Player(this.world.getDefaultArea());
    this.version = version;

    if (!this.load()) {
      console.log('Starting a new game.');
      this.initialize();
    }
  }

  save(): void {
    const gameState = {
      player: this.player.serialize(),
      world: this.world.serialize(),
      version: this.version,
      timestamp: Date.now()
    };

    console.log('Saving game state...', gameState);
    localStorage.setItem('gameState', JSON.stringify(gameState));
    console.log('Game saved.');
  }

  load(): boolean {
    const data = localStorage.getItem('gameState');
    if (!data) {
      console.log('No game state found in localStorage.');
      return false;
    }

    try {
      const gameState = JSON.parse(data);
      this.world.load(gameState.world);
      this.player.load(gameState.player, this.world);
      console.log('Game state loaded.');
      return true;
    } catch (error) {
      console.error('Failed to load game state:', error);
      return false;
    }
  }

  initialize(): void {
    this.world.initialize();
    this.player.initialize(this.world.getArea('Town Square'));
    console.log('New game started.');
  }

  reset(): void {
    if (this.confirmReset()) {
      localStorage.removeItem('gameState');
      console.log('Saved game state removed.');
      this.initialize();
    }
  }

  confirmReset(): boolean {
    return window.confirm(
      'Are you sure you want to reset the game? All saved progress will be lost.'
    );
  }

  start(): void {
    console.log('Game started.');
    this.player.describeLocation();
    // Start accepting input
  }
}
