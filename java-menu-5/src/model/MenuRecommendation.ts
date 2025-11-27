import { Category } from './Category';
import { Coach } from './Coach';

const MAX_CATEGORY_COUNT = 2;
const DAYS_OF_WEEK = 5;

export class MenuRecommendation {
  private coaches: Coach[];
  private weeklyCategories: Category[];
  private weeklyMenus: Map<Coach, string[]>;

  constructor(coaches: Coach[]) {
    this.coaches = [...coaches];
    this.weeklyCategories = [];
    this.weeklyMenus = new Map();
    this.initializeWeeklyMenus();
  }

  private initializeWeeklyMenus(): void {
    for (const coach of this.coaches) {
      this.weeklyMenus.set(coach, []);
    }
  }

  addCategory(category: Category): void {
    if (this.getCategoryCount(category) >= MAX_CATEGORY_COUNT) {
      throw new Error('[ERROR] 같은 카테고리는 최대 2회까지만 선택할 수 있습니다.');
    }
    this.weeklyCategories.push(category);
  }

  private getCategoryCount(category: Category): number {
    return this.weeklyCategories.filter((c) => c === category).length;
  }

  addMenuForCoach(coach: Coach, menu: string): void {
    const menus = this.weeklyMenus.get(coach);
    if (menus) {
      menus.push(menu);
    }
    coach.addRecommendedMenu(menu);
  }

  getWeeklyCategories(): Category[] {
    return [...this.weeklyCategories];
  }

  getMenusForCoach(coach: Coach): string[] {
    const menus = this.weeklyMenus.get(coach);
    return menus ? [...menus] : [];
  }

  getCoaches(): Coach[] {
    return [...this.coaches];
  }

  isComplete(): boolean {
    return this.weeklyCategories.length === DAYS_OF_WEEK;
  }
}

