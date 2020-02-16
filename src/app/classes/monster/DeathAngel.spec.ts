import { DeathAngel } from './DeathAngel';

describe('DeathAngel', () => {
  describe('Initialization of parameters on which monster display depends', () => {
    let initialParams;
    let deathAngel: DeathAngel;

    beforeEach(() => {
      initialParams = {
        name: 'death-angel',
        sizeInPx: { width: 200, height: 146 },
        attack: {
          deltaPositionInPx: { left: 60, top: 40 },
          sizeInPx: 50
        }
      };

      deathAngel = new DeathAngel();
    });

    it('should correct monster name', () => expect(deathAngel.name).toBe(initialParams.name));

    it('should correct sizeInPx for monster', () => expect(deathAngel.sizeInPx).toEqual(initialParams.sizeInPx));

    it('should correct deltaPositionInPx for attack', () =>
      expect((deathAngel as any)._attack.deltaPositionInPx).toEqual(initialParams.attack.deltaPositionInPx));

    it('should correct sizeInPx for attack', () =>
      expect((deathAngel as any)._attack.sizeInPx).toBe(initialParams.attack.sizeInPx));
  });
});
