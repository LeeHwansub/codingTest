import { Coach } from '../model/Coach';

describe('Coach', () => {
  describe('생성자', () => {
    it('유효한 이름(2글자)으로 코치를 생성할 수 있다', () => {
      const coach = new Coach('토미');
      expect(coach.getName()).toBe('토미');
    });

    it('유효한 이름(3글자)으로 코치를 생성할 수 있다', () => {
      const coach = new Coach('제임스');
      expect(coach.getName()).toBe('제임스');
    });

    it('유효한 이름(4글자)으로 코치를 생성할 수 있다', () => {
      const coach = new Coach('토미제임');
      expect(coach.getName()).toBe('토미제임');
    });

    it('이름이 1글자이면 에러를 발생시킨다', () => {
      expect(() => new Coach('토')).toThrow('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
    });

    it('이름이 5글자 이상이면 에러를 발생시킨다', () => {
      expect(() => new Coach('토미제임스')).toThrow('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
    });

    it('빈 문자열이면 에러를 발생시킨다', () => {
      expect(() => new Coach('')).toThrow('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
    });

    it('null이면 에러를 발생시킨다', () => {
      expect(() => new Coach(null as any)).toThrow('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
    });
  });

  describe('setBannedMenus', () => {
    it('못 먹는 메뉴가 없을 수 있다', () => {
      const coach = new Coach('토미');
      coach.setBannedMenus([]);
      expect(coach.canEat('규동')).toBe(true);
    });

    it('못 먹는 메뉴 1개를 설정할 수 있다', () => {
      const coach = new Coach('토미');
      coach.setBannedMenus(['우동']);
      expect(coach.canEat('우동')).toBe(false);
      expect(coach.canEat('규동')).toBe(true);
    });

    it('못 먹는 메뉴 2개를 설정할 수 있다', () => {
      const coach = new Coach('토미');
      coach.setBannedMenus(['우동', '스시']);
      expect(coach.canEat('우동')).toBe(false);
      expect(coach.canEat('스시')).toBe(false);
      expect(coach.canEat('규동')).toBe(true);
    });

    it('못 먹는 메뉴가 3개 이상이면 에러를 발생시킨다', () => {
      const coach = new Coach('토미');
      expect(() => coach.setBannedMenus(['우동', '스시', '규동'])).toThrow(
        '[ERROR] 못 먹는 메뉴는 최대 2개까지 입력할 수 있습니다.'
      );
    });

    it('못 먹는 메뉴를 재설정할 수 있다', () => {
      const coach = new Coach('토미');
      coach.setBannedMenus(['우동']);
      coach.setBannedMenus(['스시']);
      expect(coach.canEat('우동')).toBe(true);
      expect(coach.canEat('스시')).toBe(false);
    });
  });

  describe('canEat', () => {
    it('못 먹는 메뉴가 없으면 모든 메뉴를 먹을 수 있다', () => {
      const coach = new Coach('토미');
      expect(coach.canEat('규동')).toBe(true);
      expect(coach.canEat('우동')).toBe(true);
    });

    it('못 먹는 메뉴는 먹을 수 없다', () => {
      const coach = new Coach('토미');
      coach.setBannedMenus(['우동']);
      expect(coach.canEat('우동')).toBe(false);
    });
  });

  describe('addRecommendedMenu', () => {
    it('추천된 메뉴를 추가할 수 있다', () => {
      const coach = new Coach('토미');
      coach.addRecommendedMenu('규동');
      expect(coach.hasEaten('규동')).toBe(true);
      expect(coach.getRecommendedMenus()).toEqual(['규동']);
    });

    it('여러 메뉴를 추가할 수 있다', () => {
      const coach = new Coach('토미');
      coach.addRecommendedMenu('규동');
      coach.addRecommendedMenu('우동');
      expect(coach.hasEaten('규동')).toBe(true);
      expect(coach.hasEaten('우동')).toBe(true);
      expect(coach.getRecommendedMenus()).toEqual(['규동', '우동']);
    });

    it('이미 추천된 메뉴를 다시 추가하면 에러를 발생시킨다', () => {
      const coach = new Coach('토미');
      coach.addRecommendedMenu('규동');
      expect(() => coach.addRecommendedMenu('규동')).toThrow('[ERROR] 이미 추천된 메뉴입니다.');
    });
  });

  describe('hasEaten', () => {
    it('추천되지 않은 메뉴는 먹지 않았다', () => {
      const coach = new Coach('토미');
      expect(coach.hasEaten('규동')).toBe(false);
    });

    it('추천된 메뉴는 먹었다', () => {
      const coach = new Coach('토미');
      coach.addRecommendedMenu('규동');
      expect(coach.hasEaten('규동')).toBe(true);
    });
  });

  describe('getRecommendedMenus', () => {
    it('추천된 메뉴 목록을 반환한다', () => {
      const coach = new Coach('토미');
      coach.addRecommendedMenu('규동');
      coach.addRecommendedMenu('우동');
      expect(coach.getRecommendedMenus()).toEqual(['규동', '우동']);
    });

    it('반환된 목록은 원본을 변경하지 않는다', () => {
      const coach = new Coach('토미');
      coach.addRecommendedMenu('규동');
      const menus = coach.getRecommendedMenus();
      menus.push('우동');
      expect(coach.getRecommendedMenus()).toEqual(['규동']);
    });
  });
});
