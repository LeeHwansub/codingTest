import { Category } from '../model/Category';
import { Coach } from '../model/Coach';
import { MenuRecommendation } from '../model/MenuRecommendation';
import { OutputView } from '../view/OutputView';

describe('OutputView', () => {
  let outputView: OutputView;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    outputView = new OutputView();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('printStartMessage', () => {
    it('시작 메시지를 출력한다', () => {
      outputView.printStartMessage();
      expect(consoleSpy).toHaveBeenCalledWith('점심 메뉴 추천을 시작합니다.');
      expect(consoleSpy).toHaveBeenCalledWith();
    });
  });

  describe('printRecommendationResult', () => {
    it('메뉴 추천 결과를 출력한다', () => {
      const coaches = [new Coach('토미'), new Coach('제임스')];
      const recommendation = new MenuRecommendation(coaches);
      
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addMenuForCoach(coaches[0], '규동');
      recommendation.addMenuForCoach(coaches[1], '우동');

      outputView.printRecommendationResult(recommendation);

      expect(consoleSpy).toHaveBeenCalledWith('메뉴 추천 결과입니다.');
      expect(consoleSpy).toHaveBeenCalledWith('[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]');
      expect(consoleSpy).toHaveBeenCalledWith('[ 카테고리 | 일식 |');
      expect(consoleSpy).toHaveBeenCalledWith('[ 토미 | 규동 |');
      expect(consoleSpy).toHaveBeenCalledWith('[ 제임스 | 우동 |');
      expect(consoleSpy).toHaveBeenCalledWith();
      expect(consoleSpy).toHaveBeenCalledWith('추천을 완료했습니다.');
    });

    it('여러 코치의 메뉴를 출력한다', () => {
      const coaches = [new Coach('토미'), new Coach('제임스'), new Coach('포코')];
      const recommendation = new MenuRecommendation(coaches);
      
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addMenuForCoach(coaches[0], '규동');
      recommendation.addMenuForCoach(coaches[1], '우동');
      recommendation.addMenuForCoach(coaches[2], '스시');

      outputView.printRecommendationResult(recommendation);

      const output = consoleSpy.mock.calls.map((call) => call.join(' ')).join('\n');
      expect(output).toContain('[ 토미 |');
      expect(output).toContain('[ 제임스 |');
      expect(output).toContain('[ 포코 |');
    });

    it('5일치 메뉴를 모두 출력한다', () => {
      const coaches = [new Coach('토미')];
      const recommendation = new MenuRecommendation(coaches);
      
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addCategory(Category.JAPANESE);
      recommendation.addCategory(Category.KOREAN);
      recommendation.addCategory(Category.KOREAN);
      recommendation.addCategory(Category.CHINESE);
      
      recommendation.addMenuForCoach(coaches[0], '메뉴0');
      recommendation.addMenuForCoach(coaches[0], '메뉴1');
      recommendation.addMenuForCoach(coaches[0], '메뉴2');
      recommendation.addMenuForCoach(coaches[0], '메뉴3');
      recommendation.addMenuForCoach(coaches[0], '메뉴4');

      outputView.printRecommendationResult(recommendation);

      const output = consoleSpy.mock.calls.map((call) => call.join(' ')).join('\n');
      expect(output).toContain('메뉴0');
      expect(output).toContain('메뉴1');
      expect(output).toContain('메뉴2');
      expect(output).toContain('메뉴3');
      expect(output).toContain('메뉴4');
    });
  });
});

