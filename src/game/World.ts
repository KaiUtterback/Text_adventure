import { Area } from './Area';

export class World {
  areas: Map<string, Area>;
  defaultArea: Area;

  constructor() {
    this.areas = new Map();
    this.defaultArea = new Area('Default', 'This is the default area.');
  }

  serialize(): object {
    return {
      areas: Array.from(this.areas.values()).map((area) => area.serialize())
    };
  }

  // TODO: You make a loop-de-loop and load and your code is looking slowed
  load(serializedWorld: any): void {
    this.areas.clear(); // Clear current areas if re-loading

    serializedWorld.areas.forEach((areaData: any) => {
      const area = new Area(areaData.name, areaData.description);
      this.areas.set(areaData.name, area);
    });

    serializedWorld.areas.forEach((areaData: any) => {
      const area = this.areas.get(areaData.name);
      if (area) {
        area.load(areaData, this.areas);
      }
    });

    console.log('World loaded.');
  }

  initialize(): void {
    this.addArea('Town Square', 'You are in the center of the town.');
    this.addArea('Tavern', 'The local watering hole.');
    this.addArea('Blacksmith', 'You hear the ringing of an anvil.');

    this.connectAreas('Town Square', 'east', 'Tavern');
    this.connectAreas('Tavern', 'south', 'Blacksmith');
    this.connectAreas('Blacksmith', 'west', 'Town Square');
    console.log('World setup complete.');
  }

  getArea(name: string): Area | undefined {
    return this.areas.get(name);
  }

  getDefaultArea(): Area {
    return this.defaultArea;
  }

  addArea(name: string, description: string): Area {
    const area = new Area(name, description);
    this.areas.set(name, area);
    return area;
  }

  connectAreas(fromName: string, direction: string, toName: string): void {
    const fromArea = this.areas.get(fromName);
    const toArea = this.areas.get(toName);
    if (fromArea && toArea) {
      fromArea.connectArea(direction, toArea);
      toArea.connectArea(toArea.oppositeDirection(direction), fromArea);
    } else {
      console.error(`Cannot connect ${fromName} to ${toName}: Area not found.`);
    }
  }
}
