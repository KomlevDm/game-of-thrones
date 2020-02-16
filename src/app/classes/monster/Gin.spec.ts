import { Gin } from './Gin';
import { SIZE_FIELD_GAME_IN_PX } from 'src/app/constants/gameSettings';

describe('Gin', () => {
  describe('Initialization of parameters on which monster display depends', () => {
    let initialParams;
    let gin: Gin;

    beforeEach(() => {
      initialParams = {
        name: 'gin',
        positionInPx: { left: SIZE_FIELD_GAME_IN_PX.width, top: 350 },
        sizeInPx: { width: 180, height: 180 },
        attack: {
          deltaPositionInPx: { left: 10, top: 50 }
        }
      };

      gin = new Gin();
    });

    it('should correct monster name', () => expect(gin.name).toBe(initialParams.name));

    it('should correct positionInPx for monster', () => expect(gin.positionInPx).toEqual(initialParams.positionInPx));

    it('should correct sizeInPx for monster', () => expect(gin.sizeInPx).toEqual(initialParams.sizeInPx));

    it('should correct deltaPositionInPx for attack', () =>
      expect((gin as any)._attack.deltaPositionInPx).toEqual(initialParams.attack.deltaPositionInPx));
  });
});
