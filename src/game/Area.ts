export class Area {
  name: string;
  description: string;
  connections: Map<string, Area>;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.connections = new Map();
  }

  serialize(): object {
    return {
      name: this.name,
      description: this.description,
      connections: Array.from(this.connections.entries()).map(
        ([direction, connectedArea]) => ({
          direction,
          connectedAreaName: connectedArea.name
        })
      )
    };
  }

  load(serializedArea: any, allAreas: Map<string, Area>): void {
    this.name = serializedArea.name;
    this.description = serializedArea.description;
    serializedArea.connections.forEach((connection: any) => {
      const connectedArea = allAreas.get(connection.connectedAreaName);
      if (connectedArea) {
        this.connectArea(connection.direction, connectedArea);
      }
    });
  }

  oppositeDirection(direction: string): string {
    switch (direction) {
      case 'north':
        return 'south';
      case 'south':
        return 'north';
      case 'east':
        return 'west';
      case 'west':
        return 'east';
    }
  }

  connectArea(direction: string, area: Area): void {
    this.connections.set(direction, area);
  }

  describe(): string {
    return `${this.name}: ${this.description}`;
  }
}
