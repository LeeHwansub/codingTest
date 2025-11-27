import * as readline from 'readline';
import { Constants } from '../constants/Constants';
import { ErrorMessages } from '../constants/ErrorMessages';
import { OutputMessages } from '../constants/OutputMessages';

const { MIN_COUNT, MAX_COUNT, MAX_BANNED_MENUS, MIN_NAME_LENGTH, MAX_NAME_LENGTH } = Constants.COACH;
const { INPUT } = Constants.DELIMITER;

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
        console.log(OutputMessages.INPUT_COACH_NAMES);
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
      throw new Error(ErrorMessages.COACH_NAME_REQUIRED);
    }
    const names = input
      .split(INPUT)
      .map((name) => name.trim())
      .filter((name) => name.length > 0);
    this.validateNameLengths(names);
    return names;
  }

  private validateNameLengths(names: string[]): void {
    for (const name of names) {
      if (name.length < MIN_NAME_LENGTH || name.length > MAX_NAME_LENGTH) {
        throw new Error(ErrorMessages.COACH_NAME_LENGTH);
      }
    }
  }

  private validateCoachCount(names: string[]): void {
    if (names.length < MIN_COUNT || names.length > MAX_COUNT) {
      throw new Error(ErrorMessages.COACH_COUNT);
    }
  }

  async readBannedMenus(coachName: string): Promise<string[]> {
    return new Promise((resolve) => {
      const askQuestion = () => {
        console.log(OutputMessages.INPUT_BANNED_MENUS(coachName));
        this.rl.question('', (input: string) => {
          try {
            if (!input || input.trim().length === 0) {
              resolve([]);
              return;
            }
            const menus = input
              .split(INPUT)
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
    if (menus.length > MAX_BANNED_MENUS) {
      throw new Error(ErrorMessages.BANNED_MENUS_COUNT);
    }
  }

  close(): void {
    this.rl.close();
  }
}

