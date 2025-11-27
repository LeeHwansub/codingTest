import { Coach } from '../model/Coach';

describe('Coach', () => {
  describe('생성자', () => {
    it('유효한 이름으로 코치를 생성할 수 있다', () => {
      const coach = new Coach('토미');
      expect(coach.getName()).toBe('토미');
    });

    it('이름이 2글자 미만이면 에러를 발생시킨다', () => {
      expect(() => new Coach('토')).toThrow('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
    });

    it('이름이 4글자를 초과하면 에러를 발생시킨다', () => {
      expect(() => new Coach('토미제임스')).toThrow('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
    });
  });

  describe('setBannedMenus', () => {
    it('못 먹는 메뉴를 설정할 수 있다', () => {
      const coach = new Coach('토미');
      coach.setBannedMenus(['우동', '스시']);
      expect(coach.canEat('우동')).toBe(false);
      expect(coach.canEat('스시')).toBe(false);
      expect(coach.canEat('규동')).toBe(true);
    });

    it('못 먹는 메뉴가 2개를 초과하면 에러를 발생시킨다', () => {
      const coach = new Coach('토미');
      expect(() => coach.setBannedMenus(['우동', '스시', '규동'])).toThrow(
        '[ERROR] 못 먹는 메뉴는 최대 2개까지 입력할 수 있습니다.'
      );
    });
  });

  describe('addRecommendedMenu', () => {
    it('추천된 메뉴를 추가할 수 있다', () => {
      const coach = new Coach('토미');
      coach.addRecommendedMenu('규동');
      expect(coach.hasEaten('규동')).toBe(true);
      expect(coach.getRecommendedMenus()).toEqual(['규동']);
    });

    it('이미 추천된 메뉴를 다시 추가하면 에러를 발생시킨다', () => {
      const coach = new Coach('토미');
      coach.addRecommendedMenu('규동');
      expect(() => coach.addRecommendedMenu('규동')).toThrow('[ERROR] 이미 추천된 메뉴입니다.');
    });
  });
});

