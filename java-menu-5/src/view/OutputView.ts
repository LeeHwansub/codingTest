import { Category } from '../model/Category';
import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';
import { getCategoryName } from '../model/Category';
import { OutputMessages } from '../constants/OutputMessages';
import { Constants } from '../constants/Constants';

const { OUTPUT } = Constants.DELIMITER;

export class OutputView {
  printStartMessage(): void {
    console.log(OutputMessages.START);
    console.log();
  }

  printRecommendationResult(recommendation: MenuRecommendation): void {
    console.log(OutputMessages.RESULT_TITLE);
    this.printHeader();
    this.printCategories(recommendation.getWeeklyCategories());
    this.printCoachesMenus(recommendation);
    console.log();
    console.log(OutputMessages.COMPLETE);
  }

  private printHeader(): void {
    console.log(OutputMessages.TABLE_HEADER);
  }

  private printCategories(categories: Category[]): void {
    let result = OutputMessages.CATEGORY_ROW_PREFIX;
    for (const category of categories) {
      result += ` ${getCategoryName(category)}${OUTPUT}`;
    }
    console.log(result);
  }

  private printCoachesMenus(recommendation: MenuRecommendation): void {
    for (const coach of recommendation.getCoaches()) {
      const menus = recommendation.getMenusForCoach(coach);
      let result = OutputMessages.COACH_ROW_PREFIX(coach.getName());
      for (const menu of menus) {
        result += ` ${menu}${OUTPUT}`;
      }
      console.log(result);
    }
  }
}

