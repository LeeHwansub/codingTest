import { Category, getCategoryFromNumber, getCategoryName, getCategoryMenus } from '../model/Category';

describe('Category', () => {
  describe('getCategoryFromNumber', () => {
    it('1번은 일식을 반환한다', () => {
      expect(getCategoryFromNumber(1)).toBe(Category.JAPANESE);
    });

    it('2번은 한식을 반환한다', () => {
      expect(getCategoryFromNumber(2)).toBe(Category.KOREAN);
    });

    it('3번은 중식을 반환한다', () => {
      expect(getCategoryFromNumber(3)).toBe(Category.CHINESE);
    });

    it('4번은 아시안을 반환한다', () => {
      expect(getCategoryFromNumber(4)).toBe(Category.ASIAN);
    });

    it('5번은 양식을 반환한다', () => {
      expect(getCategoryFromNumber(5)).toBe(Category.WESTERN);
    });

    it('잘못된 번호는 에러를 발생시킨다', () => {
      expect(() => getCategoryFromNumber(6)).toThrow('[ERROR] 잘못된 카테고리 번호입니다.');
    });
  });

  describe('getCategoryName', () => {
    it('카테고리 이름을 반환한다', () => {
      expect(getCategoryName(Category.JAPANESE)).toBe('일식');
      expect(getCategoryName(Category.KOREAN)).toBe('한식');
      expect(getCategoryName(Category.CHINESE)).toBe('중식');
      expect(getCategoryName(Category.ASIAN)).toBe('아시안');
      expect(getCategoryName(Category.WESTERN)).toBe('양식');
    });
  });

  describe('getCategoryMenus', () => {
    it('카테고리의 메뉴 목록을 반환한다', () => {
      const menus = getCategoryMenus(Category.JAPANESE);
      expect(menus).toContain('규동');
      expect(menus).toContain('우동');
      expect(menus.length).toBe(9);
    });
  });
});

