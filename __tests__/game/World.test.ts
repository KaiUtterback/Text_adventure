import { World } from '../../src/game/World';

describe('World', () => {
  let world: World;

  beforeEach(() => {
    world = new World();
  });

  test('serialize should return correct data', () => {
    const area = world.addArea(
      'Town Square',
      'You are in the center of the town.'
    );
    const serializedWorld = world.serialize();
    expect(serializedWorld).toEqual({
      areas: [area.serialize()]
    });
  });

  test('load should set the correct area from world', () => {
    const area = world.addArea(
      'Town Square',
      'You are in the center of the town.'
    );
    const serializedWorld = world.serialize();
    world.load(serializedWorld);
    const loadedArea = world.getArea('Town Square');
    expect(loadedArea).toBeDefined();
    expect(loadedArea?.name).toBe(area.name);
    expect(loadedArea?.description).toBe(area.description);
  });

  test('initialize should set the correct area from world', () => {
    world.initialize();
    expect(world.areas.size).toBe(3);
  });

  test('getArea should return correct area', () => {
    const newArea = world.addArea(
      'Town Square',
      'You are in the center of the town.'
    );
    const area = world.getArea('Town Square');
    expect(area).toBe(newArea);
  });

  test('getDefaultArea should return correct area', () => {
    const area = world.getDefaultArea();
    expect(area).toBeDefined();
  });

  test('addArea should return correct area', () => {
    const area = world.addArea(
      'Town Square',
      'You are in the center of the town.'
    );
    expect(area).toBeDefined();
    expect(area.name).toBe('Town Square');
    expect(area.description).toBe('You are in the center of the town.');
  });

  test('connectAreas should connect two areas', () => {
    const area1 = world.addArea(
      'Town Square',
      'You are in the center of the town.'
    );
    const area2 = world.addArea('Tavern', 'The local watering hole.');
    world.connectAreas('Town Square', 'east', 'Tavern');
    expect(area1.connections.get('east')).toBe(area2);
    expect(area2.connections.get('west')).toBe(area1); // Assumes bi-directional connection if implemented
  });
});
