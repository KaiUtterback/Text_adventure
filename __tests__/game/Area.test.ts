import { Area } from '../../src/game/Area';

describe('Area', () => {
  test('serialize should return correct data', () => {
    const area = new Area('Town Square', 'You are in the center of the town.');
    const serializedArea = area.serialize();
    expect(serializedArea).toEqual({
      name: 'Town Square',
      description: 'You are in the center of the town.',
      connections: []
    });
  });

  test('load should set the correct area from world', () => {
    const area = new Area('Town Square', 'You are in the center of the town.');
    const world: any = { getArea: jest.fn().mockReturnValue(area) };
    area.load(
      {
        name: 'Town Square',
        description: 'You are in the center of the town.',
        connections: []
      },
      world
    );
    expect(area).toBe(world.getArea('Town Square'));
  });

  test('connectAreas should connect two areas', () => {
    const area1 = new Area('Town Square', 'You are in the center of the town.');
    const area2 = new Area('Tavern', 'The local watering hole.');
    area1.connectArea('east', area2);
    expect(area1.connections.get('east')).toBe(area2);
  });

  test('describe should return correct description', () => {
    const area = new Area('Town Square', 'You are in the center of the town.');
    expect(area.describe()).toBe(
      'Town Square: You are in the center of the town.'
    );
  });

  test('oppositeDirection should return correct direction', () => {
    const area = new Area('Town Square', 'You are in the center of the town.');
    expect(area.oppositeDirection('east')).toBe('west');
    expect(area.oppositeDirection('west')).toBe('east');
    expect(area.oppositeDirection('north')).toBe('south');
    expect(area.oppositeDirection('south')).toBe('north');
  });
});
