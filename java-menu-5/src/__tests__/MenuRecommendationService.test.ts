import { Category } from '../model/Category';
import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';
import { MenuRecommendationService } from '../service/MenuRecommendationService';

describe('MenuRecommendationService', () => {
  let service: MenuRecommendationService;

  beforeEach(() => {
    service = new MenuRecommendationService();
  });

  describe('recommendMenus', () => {
    it('5일치 메뉴를 추천한다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = service.recommendMenus(coaches);
      
      expect(recommendation.getWeeklyCategories().length).toBe(5);
      expect(recommendation.getMenusForCoach(coaches[0]).length).toBe(5);
    });

    it('각 코치에게 매일 다른 메뉴를 추천한다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = service.recommendMenus(coaches);
      const menus = recommendation.getMenusForCoach(coaches[0]);
      
      const uniqueMenus = new Set(menus);
      expect(uniqueMenus.size).toBe(5);
    });

    it('못 먹는 메뉴는 추천하지 않는다', () => {
      const coaches = [new Coach('토미')];
      coaches[0].setBannedMenus(['규동', '우동']);
      const recommendation = service.recommendMenus(coaches);
      const menus = recommendation.getMenusForCoach(coaches[0]);
      
      expect(menus).not.toContain('규동');
      expect(menus).not.toContain('우동');
    });

    it('여러 코치에게 각각 다른 메뉴를 추천한다', () => {
      const coaches = [new Coach('토미'), new Coach('제임스')];
      const recommendation = service.recommendMenus(coaches);
      
      const menus1 = recommendation.getMenusForCoach(coaches[0]);
      const menus2 = recommendation.getMenusForCoach(coaches[1]);
      
      // 각 코치가 매일 다른 메뉴를 받았는지 확인
      expect(new Set(menus1).size).toBe(5);
      expect(new Set(menus2).size).toBe(5);
    });

    it('같은 카테고리는 최대 2회까지만 선택된다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = service.recommendMenus(coaches);
      const categories = recommendation.getWeeklyCategories();
      
      const categoryCounts = new Map<Category, number>();
      for (const category of categories) {
        categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
      }
      
      for (const count of categoryCounts.values()) {
        expect(count).toBeLessThanOrEqual(2);
      }
    });

    it('5일치 카테고리가 모두 선택된다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = service.recommendMenus(coaches);
      const categories = recommendation.getWeeklyCategories();
      
      expect(categories.length).toBe(5);
    });

    it('각 코치가 한 주에 중복되지 않는 메뉴를 받는다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = service.recommendMenus(coaches);
      const menus = recommendation.getMenusForCoach(coaches[0]);
      
      const uniqueMenus = new Set(menus);
      expect(uniqueMenus.size).toBe(menus.length);
    });

    it('못 먹는 메뉴가 많은 경우에도 추천이 가능하다', () => {
      const coaches = [new Coach('토미')];
      coaches[0].setBannedMenus(['규동', '우동']);
      const recommendation = service.recommendMenus(coaches);
      const menus = recommendation.getMenusForCoach(coaches[0]);
      
      expect(menus.length).toBe(5);
      expect(menus.every((menu) => menu !== '규동' && menu !== '우동')).toBe(true);
    });
  });

  describe('카테고리 선택 로직', () => {
    it('카테고리 선택이 제한을 준수한다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = service.recommendMenus(coaches);
      const categories = recommendation.getWeeklyCategories();
      
      const categoryCounts = new Map<Category, number>();
      for (const category of categories) {
        categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
      }
      
      // 각 카테고리는 최대 2회
      for (const count of categoryCounts.values()) {
        expect(count).toBeLessThanOrEqual(2);
      }
      
      // 총 5개의 카테고리가 선택됨
      expect(categories.length).toBe(5);
    });
  });

  describe('메뉴 선택 로직', () => {
    it('각 코치에게 적절한 메뉴를 추천한다', () => {
      const coaches = [new Coach('토미'), new Coach('제임스')];
      coaches[0].setBannedMenus(['규동']);
      coaches[1].setBannedMenus(['우동']);
      
      const recommendation = service.recommendMenus(coaches);
      
      const menus1 = recommendation.getMenusForCoach(coaches[0]);
      const menus2 = recommendation.getMenusForCoach(coaches[1]);
      
      expect(menus1).not.toContain('규동');
      expect(menus2).not.toContain('우동');
      expect(menus1.length).toBe(5);
      expect(menus2.length).toBe(5);
    });
  });
});

