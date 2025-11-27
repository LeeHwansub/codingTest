import { Constants } from '../constants/Constants';
import { ErrorMessages } from '../constants/ErrorMessages';

const { MIN_NAME_LENGTH, MAX_NAME_LENGTH, MAX_BANNED_MENUS } = Constants.COACH;

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
      throw new Error(ErrorMessages.COACH_NAME_LENGTH);
    }
  }

  setBannedMenus(bannedMenus: string[]): void {
    if (bannedMenus.length > MAX_BANNED_MENUS) {
      throw new Error(ErrorMessages.BANNED_MENUS_COUNT);
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
      throw new Error(ErrorMessages.ALREADY_RECOMMENDED);
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

