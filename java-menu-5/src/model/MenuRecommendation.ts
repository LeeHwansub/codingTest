import { Category } from './Category';
import { Coach } from './Coach';
import { Constants } from '../constants/Constants';
import { ErrorMessages } from '../constants/ErrorMessages';

const { MAX_COUNT_PER_WEEK } = Constants.CATEGORY;
const { DAYS } = Constants.WEEK;

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
    if (this.getCategoryCount(category) >= MAX_COUNT_PER_WEEK) {
      throw new Error(ErrorMessages.CATEGORY_LIMIT);
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
    return this.weeklyCategories.length === DAYS;
  }
}

