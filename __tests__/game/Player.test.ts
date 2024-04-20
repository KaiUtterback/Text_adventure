import { Player } from '../../src/game/Player';
import { Area } from '../../src/game/Area';

describe('Player', () => {
  let player: Player;
  let startArea: Area;

  beforeEach(() => {
    startArea = new Area('Town Square', 'You are in the center of the town.');
    player = new Player(startArea);
  });

  test('should initialize with correct start area', () => {
    expect(player.currentArea).toBe(startArea);
  });

  test('serialize should return correct data', () => {
    const serializedData = player.serialize();
    expect(serializedData).toEqual({
      currentAreaName: 'Town Square'
    });
  });

  test('load should set the correct area from world', () => {
    const world: any = { getArea: jest.fn().mockReturnValue(startArea) };
    player.load({ currentAreaName: 'Town Square' }, world);
    expect(player.currentArea).toBe(startArea);
  });
});
