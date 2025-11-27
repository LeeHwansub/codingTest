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

    it('0번은 에러를 발생시킨다', () => {
      expect(() => getCategoryFromNumber(0)).toThrow('[ERROR] 잘못된 카테고리 번호입니다.');
    });

    it('6번은 에러를 발생시킨다', () => {
      expect(() => getCategoryFromNumber(6)).toThrow('[ERROR] 잘못된 카테고리 번호입니다.');
    });

    it('음수는 에러를 발생시킨다', () => {
      expect(() => getCategoryFromNumber(-1)).toThrow('[ERROR] 잘못된 카테고리 번호입니다.');
    });
  });

  describe('getCategoryName', () => {
    it('일식 카테고리 이름을 반환한다', () => {
      expect(getCategoryName(Category.JAPANESE)).toBe('일식');
    });

    it('한식 카테고리 이름을 반환한다', () => {
      expect(getCategoryName(Category.KOREAN)).toBe('한식');
    });

    it('중식 카테고리 이름을 반환한다', () => {
      expect(getCategoryName(Category.CHINESE)).toBe('중식');
    });

    it('아시안 카테고리 이름을 반환한다', () => {
      expect(getCategoryName(Category.ASIAN)).toBe('아시안');
    });

    it('양식 카테고리 이름을 반환한다', () => {
      expect(getCategoryName(Category.WESTERN)).toBe('양식');
    });
  });

  describe('getCategoryMenus', () => {
    it('일식 메뉴 목록을 반환한다', () => {
      const menus = getCategoryMenus(Category.JAPANESE);
      expect(menus).toContain('규동');
      expect(menus).toContain('우동');
      expect(menus).toContain('미소시루');
      expect(menus.length).toBe(9);
    });

    it('한식 메뉴 목록을 반환한다', () => {
      const menus = getCategoryMenus(Category.KOREAN);
      expect(menus).toContain('김밥');
      expect(menus).toContain('김치찌개');
      expect(menus.length).toBe(9);
    });

    it('중식 메뉴 목록을 반환한다', () => {
      const menus = getCategoryMenus(Category.CHINESE);
      expect(menus).toContain('짜장면');
      expect(menus).toContain('짬뽕');
      expect(menus.length).toBe(9);
    });

    it('아시안 메뉴 목록을 반환한다', () => {
      const menus = getCategoryMenus(Category.ASIAN);
      expect(menus).toContain('팟타이');
      expect(menus).toContain('카오 팟');
      expect(menus.length).toBe(9);
    });

    it('양식 메뉴 목록을 반환한다', () => {
      const menus = getCategoryMenus(Category.WESTERN);
      expect(menus).toContain('라자냐');
      expect(menus).toContain('스파게티');
      expect(menus.length).toBe(9);
    });

    it('반환된 메뉴 목록은 원본을 변경하지 않는다', () => {
      const menus1 = getCategoryMenus(Category.JAPANESE);
      const menus2 = getCategoryMenus(Category.JAPANESE);
      menus1.push('새메뉴');
      expect(menus2).not.toContain('새메뉴');
    });
  });
});
