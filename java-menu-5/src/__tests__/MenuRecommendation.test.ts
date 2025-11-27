import { MenuRecommendationService } from '../service/MenuRecommendationService';
import { Category } from '../model/Category';
import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';

describe('MenuRecommendation 통합 테스트', () => {
  let service: MenuRecommendationService;

  beforeEach(() => {
    service = new MenuRecommendationService();
  });

  describe('전체 기능 테스트', () => {
    it('메뉴 추천이 정상적으로 동작한다', () => {
      // Given
      const coaches = [new Coach('구구'), new Coach('제임스')];
      coaches[0].setBannedMenus(['김밥']);
      coaches[1].setBannedMenus(['떡볶이']);

      // When
      const recommendation = service.recommendMenus(coaches);

      // Then
      expect(recommendation.getWeeklyCategories().length).toBe(5);
      expect(recommendation.getMenusForCoach(coaches[0]).length).toBe(5);
      expect(recommendation.getMenusForCoach(coaches[1]).length).toBe(5);

      // 각 코치가 매일 다른 메뉴를 받았는지 확인
      const menus1 = recommendation.getMenusForCoach(coaches[0]);
      const menus2 = recommendation.getMenusForCoach(coaches[1]);
      
      expect(new Set(menus1).size).toBe(5); // 중복 없음
      expect(new Set(menus2).size).toBe(5); // 중복 없음

      // 못 먹는 메뉴가 포함되지 않았는지 확인
      expect(menus1).not.toContain('김밥');
      expect(menus2).not.toContain('떡볶이');
    });

    it('같은 카테고리는 최대 2회까지만 선택된다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = service.recommendMenus(coaches);
      const categories = recommendation.getWeeklyCategories();

      // 각 카테고리의 등장 횟수 확인
      const categoryCounts = new Map<Category, number>();
      for (const category of categories) {
        categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
      }

      // 모든 카테고리가 2회 이하로 등장하는지 확인
      for (const count of categoryCounts.values()) {
        expect(count).toBeLessThanOrEqual(2);
      }
    });
  });
});

