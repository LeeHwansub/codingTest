import { Coach } from '../model/Coach';
import { MenuRecommendationController } from '../controller/MenuRecommendationController';
import { InputView } from '../view/InputView';
import { OutputView } from '../view/OutputView';
import { MenuRecommendationService } from '../service/MenuRecommendationService';

jest.mock('../view/InputView');
jest.mock('../view/OutputView');
jest.mock('../service/MenuRecommendationService');

describe('MenuRecommendationController', () => {
  let controller: MenuRecommendationController;
  let mockInputView: jest.Mocked<InputView>;
  let mockOutputView: jest.Mocked<OutputView>;
  let mockService: jest.Mocked<MenuRecommendationService>;

  beforeEach(() => {
    mockInputView = {
      readCoachNames: jest.fn(),
      readBannedMenus: jest.fn(),
      close: jest.fn(),
    } as any;

    mockOutputView = {
      printStartMessage: jest.fn(),
      printRecommendationResult: jest.fn(),
    } as any;

    mockService = {
      recommendMenus: jest.fn(),
    } as any;

    (InputView as jest.Mock).mockImplementation(() => mockInputView);
    (OutputView as jest.Mock).mockImplementation(() => mockOutputView);
    (MenuRecommendationService as jest.Mock).mockImplementation(() => mockService);

    controller = new MenuRecommendationController();
  });

  describe('run', () => {
    it('전체 흐름을 실행한다', async () => {
      const coaches = [new Coach('토미'), new Coach('제임스')];
      const mockRecommendation = {
        getWeeklyCategories: jest.fn().mockReturnValue([]),
        getCoaches: jest.fn().mockReturnValue(coaches),
        getMenusForCoach: jest.fn().mockReturnValue([]),
      } as any;

      mockInputView.readCoachNames.mockResolvedValue(['토미', '제임스']);
      mockInputView.readBannedMenus
        .mockResolvedValueOnce(['우동'])
        .mockResolvedValueOnce(['스시']);
      mockService.recommendMenus.mockReturnValue(mockRecommendation);

      await controller.run();

      expect(mockOutputView.printStartMessage).toHaveBeenCalled();
      expect(mockInputView.readCoachNames).toHaveBeenCalled();
      expect(mockInputView.readBannedMenus).toHaveBeenCalledTimes(2);
      expect(mockService.recommendMenus).toHaveBeenCalled();
      const calledCoaches = mockService.recommendMenus.mock.calls[0][0];
      expect(calledCoaches.length).toBe(2);
      expect(calledCoaches[0].getName()).toBe('토미');
      expect(calledCoaches[1].getName()).toBe('제임스');
      expect(mockOutputView.printRecommendationResult).toHaveBeenCalledWith(mockRecommendation);
      expect(mockInputView.close).toHaveBeenCalled();
    });

    it('여러 코치를 처리할 수 있다', async () => {
      const coaches = [new Coach('토미'), new Coach('제임스'), new Coach('포코')];
      const mockRecommendation = {
        getWeeklyCategories: jest.fn().mockReturnValue([]),
        getCoaches: jest.fn().mockReturnValue(coaches),
        getMenusForCoach: jest.fn().mockReturnValue([]),
      } as any;

      mockInputView.readCoachNames.mockResolvedValue(['토미', '제임스', '포코']);
      mockInputView.readBannedMenus
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce(['우동'])
        .mockResolvedValueOnce(['스시']);
      mockService.recommendMenus.mockReturnValue(mockRecommendation);

      await controller.run();

      expect(mockInputView.readBannedMenus).toHaveBeenCalledTimes(3);
      expect(mockInputView.readBannedMenus).toHaveBeenCalledWith('토미');
      expect(mockInputView.readBannedMenus).toHaveBeenCalledWith('제임스');
      expect(mockInputView.readBannedMenus).toHaveBeenCalledWith('포코');
    });

    it('못 먹는 메뉴가 없는 코치도 처리할 수 있다', async () => {
      const coaches = [new Coach('토미')];
      const mockRecommendation = {
        getWeeklyCategories: jest.fn().mockReturnValue([]),
        getCoaches: jest.fn().mockReturnValue(coaches),
        getMenusForCoach: jest.fn().mockReturnValue([]),
      } as any;

      mockInputView.readCoachNames.mockResolvedValue(['토미']);
      mockInputView.readBannedMenus.mockResolvedValueOnce([]);
      mockService.recommendMenus.mockReturnValue(mockRecommendation);

      await controller.run();

      expect(mockInputView.readBannedMenus).toHaveBeenCalledWith('토미');
      const createdCoach = mockService.recommendMenus.mock.calls[0][0][0];
      expect(createdCoach.getName()).toBe('토미');
    });
  });

  describe('createCoaches', () => {
    it('코치 이름과 못 먹는 메뉴를 입력받아 코치를 생성한다', async () => {
      mockInputView.readCoachNames.mockResolvedValue(['토미', '제임스']);
      mockInputView.readBannedMenus
        .mockResolvedValueOnce(['우동'])
        .mockResolvedValueOnce(['스시']);

      const coaches = await (controller as any).createCoaches();

      expect(coaches.length).toBe(2);
      expect(coaches[0].getName()).toBe('토미');
      expect(coaches[1].getName()).toBe('제임스');
      expect(coaches[0].canEat('우동')).toBe(false);
      expect(coaches[1].canEat('스시')).toBe(false);
    });
  });
});

