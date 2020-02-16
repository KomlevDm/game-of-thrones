import { IceDragon } from './IceDragon';
import { SIZE_FIELD_GAME_IN_PX } from 'src/app/constants/gameSettings';

describe('IceDragon', () => {
  describe('Initialization of parameters on which monster display depends', () => {
    let initialParams;
    let iceDragon: IceDragon;

    beforeEach(() => {
      initialParams = {
        name: 'ice-dragon',
        positionInPx: { left: SIZE_FIELD_GAME_IN_PX.width, top: 355 },
        sizeInPx: { width: 330, height: 203 },
        attack: {
          deltaPositionInPx: { left: 40, top: 65 },
          sizeInPx: 40
        }
      };

      iceDragon = new IceDragon();
    });

    it('should correct monster name', () => expect(iceDragon.name).toBe(initialParams.name));

    it('should correct positionInPx for monster', () =>
      expect(iceDragon.positionInPx).toEqual(initialParams.positionInPx));

    it('should correct sizeInPx for monster', () => expect(iceDragon.sizeInPx).toEqual(initialParams.sizeInPx));

    it('should correct deltaPositionInPx for attack', () =>
      expect((iceDragon as any)._attack.deltaPositionInPx).toEqual(initialParams.attack.deltaPositionInPx));

    it('should correct sizeInPx for attack', () =>
      expect((iceDragon as any)._attack.sizeInPx).toBe(initialParams.attack.sizeInPx));
  });
});
