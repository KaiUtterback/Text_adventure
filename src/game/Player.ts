import { Area } from './Area';

export class Player {
  currentArea: Area;

  constructor(startArea: Area) {
    this.currentArea = startArea;
  }

  serialize(): object {
    return {
      currentAreaName: this.currentArea.name
    };
  }

  load(player: any, world: any): void {
    this.currentArea =
      world.getArea(player.currentAreaName) || world.getDefaultArea();
  }

  initialize(startArea: Area): void {
    this.currentArea = startArea;
  }

  move(direction: string): void {
    let nextArea = this.currentArea.connections.get(direction);
    if (!nextArea) {
      // Dynamically create a new Area
      const newAreaName = `${this.currentArea.name} ${direction}`;
      nextArea = new Area(
        newAreaName,
        `You have discovered a new area to the ${direction}.`
      );
      this.currentArea.connectArea(direction, nextArea);
      console.log(`New area created: ${nextArea.describe()}`);
    }

    this.currentArea = nextArea;
    console.log(`Moved ${direction} to ${nextArea.name}.`);
    console.log(nextArea.describe());
  }

  describeLocation(): void {
    console.log(this.currentArea.describe());
  }
}
