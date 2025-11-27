const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 4;
const MAX_BANNED_MENUS = 2;

export class Coach {
  private name: string;
  private bannedMenus: string[];
  private recommendedMenus: string[];

  constructor(name: string) {
    this.validateName(name);
    this.name = name;
    this.bannedMenus = [];
    this.recommendedMenus = [];
  }

  private validateName(name: string): void {
    if (!name || name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
      throw new Error('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
    }
  }

  setBannedMenus(bannedMenus: string[]): void {
    if (bannedMenus.length > MAX_BANNED_MENUS) {
      throw new Error('[ERROR] 못 먹는 메뉴는 최대 2개까지 입력할 수 있습니다.');
    }
    this.bannedMenus = [...bannedMenus];
  }

  canEat(menu: string): boolean {
    return !this.bannedMenus.includes(menu);
  }

  hasEaten(menu: string): boolean {
    return this.recommendedMenus.includes(menu);
  }

  addRecommendedMenu(menu: string): void {
    if (this.hasEaten(menu)) {
      throw new Error('[ERROR] 이미 추천된 메뉴입니다.');
    }
    this.recommendedMenus.push(menu);
  }

  getName(): string {
    return this.name;
  }

  getRecommendedMenus(): string[] {
    return [...this.recommendedMenus];
  }
}

