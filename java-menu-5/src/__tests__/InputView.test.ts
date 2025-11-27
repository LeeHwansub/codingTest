import { InputView } from '../view/InputView';
import * as readline from 'readline';

jest.mock('readline', () => ({
  createInterface: jest.fn(),
}));

describe('InputView', () => {
  let inputView: InputView;
  let mockQuestion: jest.Mock;
  let mockClose: jest.Mock;
  let questionCallbacks: Array<(answer: string) => void> = [];

  beforeEach(() => {
    questionCallbacks = [];
    mockQuestion = jest.fn((prompt: string, callback: (answer: string) => void) => {
      questionCallbacks.push(callback);
    });
    mockClose = jest.fn();

    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: mockClose,
    });

    inputView = new InputView();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('readCoachNames', () => {
    it('유효한 코치 이름을 입력받을 수 있다', async () => {
      const promise = inputView.readCoachNames();
      questionCallbacks[0]('토미,제임스');
      const result = await promise;
      expect(result).toEqual(['토미', '제임스']);
    });

    it('공백이 포함된 이름을 처리할 수 있다', async () => {
      const promise = inputView.readCoachNames();
      questionCallbacks[0]('토미 , 제임스 , 포코');
      const result = await promise;
      expect(result).toEqual(['토미', '제임스', '포코']);
    });

    it('빈 입력 시 에러 메시지를 출력하고 재입력을 요청한다', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const promise = inputView.readCoachNames();
      
      questionCallbacks[0]('');
      await new Promise((resolve) => setTimeout(resolve, 10));
      
      questionCallbacks[1]('토미,제임스');
      const result = await promise;
      
      expect(consoleSpy).toHaveBeenCalledWith('[ERROR] 코치 이름을 입력해주세요.');
      expect(result).toEqual(['토미', '제임스']);
      
      consoleSpy.mockRestore();
    });

    it('코치가 1명이면 에러를 발생시킨다', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const promise = inputView.readCoachNames();
      
      questionCallbacks[0]('토미');
      await new Promise((resolve) => setTimeout(resolve, 10));
      
      questionCallbacks[1]('토미,제임스');
      const result = await promise;
      
      expect(consoleSpy).toHaveBeenCalledWith('[ERROR] 코치는 최소 2명 이상, 최대 5명까지 입력해야 합니다.');
      expect(result).toEqual(['토미', '제임스']);
      
      consoleSpy.mockRestore();
    });

    it('코치가 6명 이상이면 에러를 발생시킨다', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const promise = inputView.readCoachNames();
      
      questionCallbacks[0]('토미,제임스,포코,구구,제임,스파');
      await new Promise((resolve) => setTimeout(resolve, 10));
      
      questionCallbacks[1]('토미,제임스');
      const result = await promise;
      
      expect(consoleSpy).toHaveBeenCalledWith('[ERROR] 코치는 최소 2명 이상, 최대 5명까지 입력해야 합니다.');
      expect(result).toEqual(['토미', '제임스']);
      
      consoleSpy.mockRestore();
    });

    it('코치 이름이 2글자 미만이면 에러를 발생시킨다', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const promise = inputView.readCoachNames();
      
      questionCallbacks[0]('토,제임스');
      await new Promise((resolve) => setTimeout(resolve, 10));
      
      questionCallbacks[1]('토미,제임스');
      const result = await promise;
      
      expect(consoleSpy).toHaveBeenCalledWith('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
      expect(result).toEqual(['토미', '제임스']);
      
      consoleSpy.mockRestore();
    });
  });

  describe('readBannedMenus', () => {
    it('빈 입력 시 빈 배열을 반환한다', async () => {
      const promise = inputView.readBannedMenus('토미');
      questionCallbacks[0]('');
      const result = await promise;
      expect(result).toEqual([]);
    });

    it('못 먹는 메뉴 1개를 입력받을 수 있다', async () => {
      const promise = inputView.readBannedMenus('토미');
      questionCallbacks[0]('우동');
      const result = await promise;
      expect(result).toEqual(['우동']);
    });

    it('못 먹는 메뉴 2개를 입력받을 수 있다', async () => {
      const promise = inputView.readBannedMenus('토미');
      questionCallbacks[0]('우동,스시');
      const result = await promise;
      expect(result).toEqual(['우동', '스시']);
    });

    it('공백이 포함된 메뉴를 처리할 수 있다', async () => {
      const promise = inputView.readBannedMenus('토미');
      questionCallbacks[0]('우동 , 스시');
      const result = await promise;
      expect(result).toEqual(['우동', '스시']);
    });

    it('못 먹는 메뉴가 3개 이상이면 에러를 발생시킨다', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const promise = inputView.readBannedMenus('토미');
      
      questionCallbacks[0]('우동,스시,규동');
      await new Promise((resolve) => setTimeout(resolve, 10));
      
      questionCallbacks[1]('우동,스시');
      const result = await promise;
      
      expect(consoleSpy).toHaveBeenCalledWith('[ERROR] 못 먹는 메뉴는 최대 2개까지 입력할 수 있습니다.');
      expect(result).toEqual(['우동', '스시']);
      
      consoleSpy.mockRestore();
    });
  });

  describe('close', () => {
    it('readline 인터페이스를 닫을 수 있다', () => {
      inputView.close();
      expect(mockClose).toHaveBeenCalled();
    });
  });
});

