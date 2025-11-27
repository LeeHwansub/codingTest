import * as readline from 'readline';

const MIN_COACH_COUNT = 2;
const MAX_COACH_COUNT = 5;

export class InputView {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  async readCoachNames(): Promise<string[]> {
    return new Promise((resolve) => {
      const askQuestion = () => {
        console.log('코치의 이름을 입력해 주세요. (, 로 구분)');
        this.rl.question('', (input: string) => {
          try {
            const names = this.parseNames(input);
            this.validateCoachCount(names);
            resolve(names);
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            }
            askQuestion();
          }
        });
      };
      askQuestion();
    });
  }

  private parseNames(input: string): string[] {
    if (!input || input.trim().length === 0) {
      throw new Error('[ERROR] 코치 이름을 입력해주세요.');
    }
    const names = input
      .split(',')
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
    this.validateNameLengths(names);
    return names;
  }

  private validateNameLengths(names: string[]): void {
    for (const name of names) {
      if (name.length < 2 || name.length > 4) {
        throw new Error('[ERROR] 코치의 이름은 최소 2글자, 최대 4글자여야 합니다.');
      }
    }
  }

  private validateCoachCount(names: string[]): void {
    if (names.length < MIN_COACH_COUNT || names.length > MAX_COACH_COUNT) {
      throw new Error('[ERROR] 코치는 최소 2명 이상, 최대 5명까지 입력해야 합니다.');
    }
  }

  async readBannedMenus(coachName: string): Promise<string[]> {
    return new Promise((resolve) => {
      const askQuestion = () => {
        console.log(`${coachName}(이)가 못 먹는 메뉴를 입력해 주세요.`);
        this.rl.question('', (input: string) => {
          try {
            if (!input || input.trim().length === 0) {
              resolve([]);
              return;
            }
            const menus = input
              .split(',')
              .map((menu) => menu.trim())
              .filter((menu) => menu.length > 0);
            this.validateBannedMenusCount(menus);
            resolve(menus);
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
            }
            askQuestion();
          }
        });
      };
      askQuestion();
    });
  }

  private validateBannedMenusCount(menus: string[]): void {
    if (menus.length > 2) {
      throw new Error('[ERROR] 못 먹는 메뉴는 최대 2개까지 입력할 수 있습니다.');
    }
  }

  close(): void {
    this.rl.close();
  }
}

