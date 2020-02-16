import { FlyIceDragon } from './FlyIceDragon';

describe('FlyIceDragon', () => {
  describe('Initialization of parameters on which monster display depends', () => {
    let initialParams;
    let flyIceDragon: FlyIceDragon;

    beforeEach(() => {
      initialParams = {
        name: 'fly-ice-dragon',
        sizeInPx: { width: 130, height: 130 },
        attack: {
          deltaPositionInPx: { left: 15, top: 30 },
          sizeInPx: 20
        }
      };

      flyIceDragon = new FlyIceDragon();
    });

    it('should correct monster name', () => expect(flyIceDragon.name).toBe(initialParams.name));

    it('should correct sizeInPx for monster', () => expect(flyIceDragon.sizeInPx).toEqual(initialParams.sizeInPx));

    it('should correct deltaPositionInPx for attack', () =>
      expect((flyIceDragon as any)._attack.deltaPositionInPx).toEqual(initialParams.attack.deltaPositionInPx));

    it('should correct sizeInPx for attack', () =>
      expect((flyIceDragon as any)._attack.sizeInPx).toBe(initialParams.attack.sizeInPx));
  });
});
