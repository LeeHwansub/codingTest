import { Category, getCategoryFromNumber, getCategoryMenus } from '../model/Category';
import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';
import { Constants } from '../constants/Constants';

const { MIN_NUMBER, MAX_NUMBER, MAX_COUNT_PER_WEEK } = Constants.CATEGORY;
const { DAYS } = Constants.WEEK;

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

    for (let day = 0; day < DAYS; day++) {
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
      const categoryNumber = this.pickNumberInRange(MIN_NUMBER, MAX_NUMBER);
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
    return count < MAX_COUNT_PER_WEEK;
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

