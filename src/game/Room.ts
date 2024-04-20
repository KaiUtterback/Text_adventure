export class Room {
  name: string;
  description: string;
  connections: Map<string, Room>;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
    this.connections = new Map();
  }

  connectRoom(direction: string, room: Room) {
    this.connections.set(direction, room);
    room.connections.set(this.oppositeDirection(direction), this);
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
      default:
        return '';
    }
  }

  describe(): string {
    return this.description;
  }
}
