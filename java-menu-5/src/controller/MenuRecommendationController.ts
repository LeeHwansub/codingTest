import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';
import { MenuRecommendationService } from '../service/MenuRecommendationService';
import { InputView } from '../view/InputView';
import { OutputView } from '../view/OutputView';

export class MenuRecommendationController {
  private inputView: InputView;
  private outputView: OutputView;
  private service: MenuRecommendationService;

  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
    this.service = new MenuRecommendationService();
  }

  async run(): Promise<void> {
    this.outputView.printStartMessage();

    const coaches = await this.createCoaches();
    const recommendation = this.service.recommendMenus(coaches);

    this.outputView.printRecommendationResult(recommendation);
    this.inputView.close();
  }

  private async createCoaches(): Promise<Coach[]> {
    const coachNames = await this.inputView.readCoachNames();
    const coaches: Coach[] = [];

    for (const name of coachNames) {
      const coach = new Coach(name);
      const bannedMenus = await this.inputView.readBannedMenus(name);
      coach.setBannedMenus(bannedMenus);
      coaches.push(coach);
    }

    return coaches;
  }
}

