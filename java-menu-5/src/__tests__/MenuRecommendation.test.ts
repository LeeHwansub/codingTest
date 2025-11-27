import { Category } from '../model/Category';
import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';

describe('MenuRecommendation', () => {
  describe('생성자', () => {
    it('코치 리스트로 생성할 수 있다', () => {
      const coaches = [new Coach('토미'), new Coach('제임스')];
      const recommendation = new MenuRecommendation(coaches);
      expect(recommendation.getCoaches()).toEqual(coaches);
    });

    it('생성 시 주간 카테고리는 비어있다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      expect(recommendation.getWeeklyCategories().length).toBe(0);
    });

    it('생성 시 각 코치의 주간 메뉴는 비어있다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      expect(recommendation.getMenusForCoach(coaches[0]).length).toBe(0);
    });
  });

  describe('addCategory', () => {
    it('카테고리를 추가할 수 있다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addCategory(Category.JAPANESE);
      expect(recommendation.getWeeklyCategories()).toContain(Category.JAPANESE);
    });

    it('같은 카테고리를 2번까지 추가할 수 있다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addCategory(Category.JAPANESE);
      expect(recommendation.getWeeklyCategories().filter((c) => c === Category.JAPANESE).length).toBe(2);
    });

    it('같은 카테고리를 3번 추가하면 에러를 발생시킨다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addCategory(Category.JAPANESE);
      expect(() => recommendation.addCategory(Category.JAPANESE)).toThrow(
        '[ERROR] 같은 카테고리는 최대 2회까지만 선택할 수 있습니다.'
      );
    });

    it('다른 카테고리는 여러 번 추가할 수 있다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addCategory(Category.KOREAN);
      recommendation.addCategory(Category.CHINESE);
      expect(recommendation.getWeeklyCategories().length).toBe(3);
    });
  });

  describe('addMenuForCoach', () => {
    it('코치에게 메뉴를 추가할 수 있다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addMenuForCoach(coaches[0], '규동');
      expect(recommendation.getMenusForCoach(coaches[0])).toContain('규동');
    });

    it('메뉴 추가 시 코치의 추천 메뉴에도 추가된다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addMenuForCoach(coaches[0], '규동');
      expect(coaches[0].hasEaten('규동')).toBe(true);
    });

    it('여러 메뉴를 추가할 수 있다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addMenuForCoach(coaches[0], '규동');
      recommendation.addMenuForCoach(coaches[0], '우동');
      expect(recommendation.getMenusForCoach(coaches[0])).toEqual(['규동', '우동']);
    });

    it('이미 추천된 메뉴를 다시 추가하면 에러를 발생시킨다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addMenuForCoach(coaches[0], '규동');
      expect(() => recommendation.addMenuForCoach(coaches[0], '규동')).toThrow(
        '[ERROR] 이미 추천된 메뉴입니다.'
      );
    });
  });

  describe('getWeeklyCategories', () => {
    it('주간 카테고리 목록을 반환한다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addCategory(Category.KOREAN);
      expect(recommendation.getWeeklyCategories()).toEqual([Category.JAPANESE, Category.KOREAN]);
    });

    it('반환된 목록은 원본을 변경하지 않는다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addCategory(Category.JAPANESE);
      const categories = recommendation.getWeeklyCategories();
      categories.push(Category.KOREAN);
      expect(recommendation.getWeeklyCategories().length).toBe(1);
    });
  });

  describe('getMenusForCoach', () => {
    it('코치의 주간 메뉴 목록을 반환한다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addMenuForCoach(coaches[0], '규동');
      recommendation.addMenuForCoach(coaches[0], '우동');
      expect(recommendation.getMenusForCoach(coaches[0])).toEqual(['규동', '우동']);
    });

    it('반환된 목록은 원본을 변경하지 않는다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addMenuForCoach(coaches[0], '규동');
      const menus = recommendation.getMenusForCoach(coaches[0]);
      menus.push('우동');
      expect(recommendation.getMenusForCoach(coaches[0]).length).toBe(1);
    });
  });

  describe('getCoaches', () => {
    it('코치 목록을 반환한다', () => {
      const coaches = [new Coach('토미'), new Coach('제임스')];
      const recommendation = new MenuRecommendation(coaches);
      expect(recommendation.getCoaches()).toEqual(coaches);
    });

    it('반환된 목록은 원본을 변경하지 않는다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      const returnedCoaches = recommendation.getCoaches();
      returnedCoaches.push(new Coach('제임스'));
      expect(recommendation.getCoaches().length).toBe(1);
    });
  });

  describe('isComplete', () => {
    it('5일치 카테고리가 모두 추가되면 완료된다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addCategory(Category.KOREAN);
      recommendation.addCategory(Category.KOREAN);
      recommendation.addCategory(Category.CHINESE);
      expect(recommendation.isComplete()).toBe(true);
    });

    it('5일 미만이면 완료되지 않는다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      recommendation.addCategory(Category.JAPANESE);
      expect(recommendation.isComplete()).toBe(false);
    });
  });
});
