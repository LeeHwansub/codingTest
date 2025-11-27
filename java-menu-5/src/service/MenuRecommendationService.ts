import { Category, getCategoryFromNumber, getCategoryMenus } from '../model/Category';
import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';

const MIN_CATEGORY_NUMBER = 1;
const MAX_CATEGORY_NUMBER = 5;
const DAYS_OF_WEEK = 5;
const MAX_CATEGORY_COUNT = 2;

export class MenuRecommendationService {
  private pickNumberInRange(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private shuffle<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  recommendMenus(coaches: Coach[]): MenuRecommendation {
    const recommendation = new MenuRecommendation(coaches);

    for (let day = 0; day < DAYS_OF_WEEK; day++) {
      const category = this.selectCategory(recommendation);
      recommendation.addCategory(category);

      for (const coach of coaches) {
        const menu = this.selectMenuForCoach(coach, category, recommendation);
        recommendation.addMenuForCoach(coach, menu);
      }
    }

    return recommendation;
  }

  private selectCategory(recommendation: MenuRecommendation): Category {
    while (true) {
      const categoryNumber = this.pickNumberInRange(MIN_CATEGORY_NUMBER, MAX_CATEGORY_NUMBER);
      const category = getCategoryFromNumber(categoryNumber);

      if (this.canSelectCategory(category, recommendation)) {
        return category;
      }
    }
  }

  private canSelectCategory(category: Category, recommendation: MenuRecommendation): boolean {
    const count = recommendation
      .getWeeklyCategories()
      .filter((c) => c === category).length;
    return count < MAX_CATEGORY_COUNT;
  }

  private selectMenuForCoach(
    coach: Coach,
    category: Category,
    recommendation: MenuRecommendation
  ): string {
    const allMenus = getCategoryMenus(category);

    while (true) {
      const shuffledMenus = this.shuffle(allMenus);
      const menu = shuffledMenus[0];

      if (this.isValidMenu(coach, menu)) {
        return menu;
      }
    }
  }

  private isValidMenu(coach: Coach, menu: string): boolean {
    return coach.canEat(menu) && !coach.hasEaten(menu);
  }
}

