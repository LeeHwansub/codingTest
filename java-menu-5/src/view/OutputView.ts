import { Category } from '../model/Category';
import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';
import { getCategoryName } from '../model/Category';

const DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일'];

export class OutputView {
  printStartMessage(): void {
    console.log('점심 메뉴 추천을 시작합니다.');
    console.log();
  }

  printRecommendationResult(recommendation: MenuRecommendation): void {
    console.log('메뉴 추천 결과입니다.');
    this.printHeader();
    this.printCategories(recommendation.getWeeklyCategories());
    this.printCoachesMenus(recommendation);
    console.log();
    console.log('추천을 완료했습니다.');
  }

  private printHeader(): void {
    console.log('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');
  }

  private printCategories(categories: Category[]): void {
    let result = '[ 카테고리 |';
    for (const category of categories) {
      result += ` ${getCategoryName(category)} |`;
    }
    console.log(result);
  }

  private printCoachesMenus(recommendation: MenuRecommendation): void {
    for (const coach of recommendation.getCoaches()) {
      const menus = recommendation.getMenusForCoach(coach);
      let result = `[ ${coach.getName()} |`;
      for (const menu of menus) {
        result += ` ${menu} |`;
      }
      console.log(result);
    }
  }
}

