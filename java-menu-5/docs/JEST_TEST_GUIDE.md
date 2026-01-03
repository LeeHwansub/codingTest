# Jest + TypeScript 테스트 코드 작성 가이드

## 목차
1. [기본 구조](#기본-구조)
2. [테스트 작성 패턴](#테스트-작성-패턴)
3. [Matcher (검증 함수)](#matcher-검증-함수)
4. [Mock (모킹)](#mock-모킹)
5. [비동기 테스트](#비동기-테스트)
6. [TDD 사이클](#tdd-사이클)
7. [실전 예제](#실전-예제)

---

## 기본 구조

### 테스트 파일 위치
```
src/
  __tests__/
    Category.test.ts      ← 테스트 파일
  model/
    Category.ts           ← 실제 구현 파일
```

### 기본 템플릿

```typescript
import { 함수명, 클래스명 } from '../경로/파일명';

describe('테스트할 대상', () => {
  describe('기능 또는 메서드명', () => {
    it('테스트 케이스 설명', () => {
      // Given (준비)
      const input = '값';
      
      // When (실행)
      const result = 함수명(input);
      
      // Then (검증)
      expect(result).toBe('예상값');
    });
  });
});
```

### 실제 예제 (Category.test.ts)

```typescript
import { Category, getCategoryFromNumber, getCategoryName } from '../model/Category';

describe('Category', () => {
  describe('getCategoryFromNumber', () => {
    it('1번은 일식을 반환한다', () => {
      // Given & When
      const result = getCategoryFromNumber(1);
      
      // Then
      expect(result).toBe(Category.JAPANESE);
    });
  });
});
```

---

## 테스트 작성 패턴

### 1. describe - 테스트 그룹화

```typescript
describe('클래스명 또는 모듈명', () => {
  describe('메서드명 또는 기능', () => {
    // 여러 테스트 케이스들
  });
});
```

**예제:**
```typescript
describe('Coach', () => {
  describe('생성자', () => {
    // 생성자 관련 테스트들
  });
  
  describe('setBannedMenus', () => {
    // setBannedMenus 관련 테스트들
  });
});
```

### 2. it / test - 개별 테스트 케이스

```typescript
it('테스트 케이스 설명 (한국어로 명확하게)', () => {
  // 테스트 코드
});

// 또는
test('테스트 케이스 설명', () => {
  // 테스트 코드
});
```

**좋은 테스트 설명:**
- ✅ `'유효한 이름(2글자)으로 코치를 생성할 수 있다'`
- ✅ `'이름이 1글자이면 에러를 발생시킨다'`
- ❌ `'테스트1'`
- ❌ `'코치 생성'`

### 3. beforeEach / afterEach - 테스트 전후 처리

```typescript
describe('InputView', () => {
  let inputView: InputView;
  
  beforeEach(() => {
    // 각 테스트 실행 전에 실행
    inputView = new InputView();
  });
  
  afterEach(() => {
    // 각 테스트 실행 후에 실행
    jest.clearAllMocks(); // Mock 초기화
  });
});
```

---

## Matcher (검증 함수)

### 기본 Matcher

#### 1. `toBe()` - 값 비교 (===)
```typescript
expect(1 + 1).toBe(2);
expect('hello').toBe('hello');
expect(Category.JAPANESE).toBe(Category.JAPANESE);
```

#### 2. `toEqual()` - 객체/배열 깊은 비교
```typescript
expect([1, 2, 3]).toEqual([1, 2, 3]);
expect({ name: '토미' }).toEqual({ name: '토미' });
```

#### 3. `toBeTruthy()` / `toBeFalsy()` - 참/거짓
```typescript
expect(true).toBeTruthy();
expect(false).toBeFalsy();
expect(null).toBeFalsy();
expect(undefined).toBeFalsy();
```

#### 4. `toBeNull()` / `toBeUndefined()`
```typescript
expect(null).toBeNull();
expect(undefined).toBeUndefined();
```

### 문자열 Matcher

#### 5. `toContain()` - 배열/문자열 포함 여부
```typescript
expect(['규동', '우동']).toContain('규동');
expect('hello world').toContain('world');
```

#### 6. `toMatch()` - 정규식 매칭
```typescript
expect('hello').toMatch(/ell/);
```

### 숫자 Matcher

#### 7. `toBeGreaterThan()` / `toBeLessThan()`
```typescript
expect(5).toBeGreaterThan(3);
expect(2).toBeLessThan(5);
```

#### 8. `toBeCloseTo()` - 부동소수점 비교
```typescript
expect(0.1 + 0.2).toBeCloseTo(0.3);
```

### 배열/객체 Matcher

#### 9. `toHaveLength()` - 길이 확인
```typescript
expect([1, 2, 3]).toHaveLength(3);
expect('hello').toHaveLength(5);
```

#### 10. `toHaveProperty()` - 속성 확인
```typescript
expect({ name: '토미' }).toHaveProperty('name');
```

### 에러 Matcher

#### 11. `toThrow()` - 에러 발생 확인
```typescript
// 에러가 발생하는지 확인
expect(() => getCategoryFromNumber(0)).toThrow();

// 특정 에러 메시지 확인
expect(() => getCategoryFromNumber(0)).toThrow('[ERROR] 잘못된 카테고리 번호입니다.');

// 에러 타입 확인
expect(() => {
  throw new Error('에러');
}).toThrow(Error);
```

### 부정 Matcher (not)

모든 Matcher 앞에 `.not`을 붙이면 반대 검증

```typescript
expect(1).not.toBe(2);
expect(['규동']).not.toContain('우동');
```

---

## Mock (모킹)

외부 의존성을 가짜로 만들어 테스트를 격리합니다.

### 1. 함수 Mock

```typescript
// Math.random을 Mock으로 교체
const mockRandom = jest.spyOn(Math, 'random');
mockRandom.mockReturnValue(0.5);

// 사용 후 복원
mockRandom.mockRestore();
```

### 2. 모듈 Mock

```typescript
// readline 모듈 전체를 Mock
jest.mock('readline', () => ({
  createInterface: jest.fn(),
}));

import * as readline from 'readline';

// Mock 설정
(readline.createInterface as jest.Mock).mockReturnValue({
  question: jest.fn(),
  close: jest.fn(),
});
```

### 3. 객체 메서드 Mock

```typescript
// console.log를 Mock
const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

// 호출 확인
expect(consoleSpy).toHaveBeenCalledWith('메시지');

// 복원
consoleSpy.mockRestore();
```

### 4. Mock 함수 검증

```typescript
const mockFn = jest.fn();

// 호출 여부 확인
expect(mockFn).toHaveBeenCalled();

// 호출 횟수 확인
expect(mockFn).toHaveBeenCalledTimes(2);

// 호출 인자 확인
expect(mockFn).toHaveBeenCalledWith('인자1', '인자2');

// 마지막 호출 인자 확인
expect(mockFn).toHaveBeenLastCalledWith('인자');
```

### 실제 예제 (InputView.test.ts)

```typescript
import * as readline from 'readline';

jest.mock('readline', () => ({
  createInterface: jest.fn(),
}));

describe('InputView', () => {
  let mockQuestion: jest.Mock;
  
  beforeEach(() => {
    mockQuestion = jest.fn();
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: jest.fn(),
    });
  });
  
  it('코치 이름을 입력받을 수 있다', async () => {
    const inputView = new InputView();
    const promise = inputView.readCoachNames();
    
    // Mock 함수가 호출될 때 콜백 실행
    mockQuestion.mock.calls[0][1]('토미,제임스');
    
    const result = await promise;
    expect(result).toEqual(['토미', '제임스']);
  });
});
```

---

## 비동기 테스트

### Promise 반환

```typescript
it('비동기 함수를 테스트한다', async () => {
  const result = await 비동기함수();
  expect(result).toBe('예상값');
});
```

### 실제 예제

```typescript
describe('readCoachNames', () => {
  it('유효한 코치 이름을 입력받을 수 있다', async () => {
    const promise = inputView.readCoachNames();
    questionCallbacks[0]('토미,제임스');
    const result = await promise;
    expect(result).toEqual(['토미', '제임스']);
  });
});
```

---

## TDD 사이클

### Red → Green → Refactor

#### 1. Red (실패하는 테스트 작성)

```typescript
// Category.test.ts
describe('getCategoryFromNumber', () => {
  it('1번은 일식을 반환한다', () => {
    expect(getCategoryFromNumber(1)).toBe(Category.JAPANESE);
  });
});
```

**실행:** `npm test` → ❌ 실패 (함수가 아직 없음)

#### 2. Green (최소한의 구현)

```typescript
// Category.ts
export function getCategoryFromNumber(number: number): Category {
  return Category.JAPANESE; // 최소한의 구현
}
```

**실행:** `npm test` → ✅ 통과

#### 3. Refactor (리팩토링)

```typescript
// Category.ts
export function getCategoryFromNumber(number: number): Category {
  const categoryMap: { [key: number]: Category } = {
    1: Category.JAPANESE,
    2: Category.KOREAN,
    // ...
  };
  return categoryMap[number];
}
```

**실행:** `npm test` → ✅ 여전히 통과

---

## 실전 예제

### 예제 1: 단순 함수 테스트

```typescript
// Category.test.ts
describe('getCategoryName', () => {
  it('일식 카테고리 이름을 반환한다', () => {
    expect(getCategoryName(Category.JAPANESE)).toBe('일식');
  });
});
```

### 예제 2: 클래스 테스트

```typescript
// Coach.test.ts
describe('Coach', () => {
  describe('생성자', () => {
    it('유효한 이름으로 코치를 생성할 수 있다', () => {
      const coach = new Coach('토미');
      expect(coach.getName()).toBe('토미');
    });
    
    it('이름이 1글자이면 에러를 발생시킨다', () => {
      expect(() => new Coach('토')).toThrow('[ERROR] 코치의 이름은 최소 2글자...');
    });
  });
});
```

### 예제 3: Mock을 사용한 테스트

```typescript
// InputView.test.ts
jest.mock('readline');

describe('InputView', () => {
  let mockQuestion: jest.Mock;
  
  beforeEach(() => {
    mockQuestion = jest.fn();
    (readline.createInterface as jest.Mock).mockReturnValue({
      question: mockQuestion,
      close: jest.fn(),
    });
  });
  
  it('코치 이름을 입력받을 수 있다', async () => {
    const inputView = new InputView();
    const promise = inputView.readCoachNames();
    mockQuestion.mock.calls[0][1]('토미,제임스');
    const result = await promise;
    expect(result).toEqual(['토미', '제임스']);
  });
});
```

### 예제 4: 에러 케이스 테스트

```typescript
describe('getCategoryFromNumber', () => {
  it('0번은 에러를 발생시킨다', () => {
    expect(() => getCategoryFromNumber(0)).toThrow('[ERROR] 잘못된 카테고리 번호입니다.');
  });
  
  it('6번은 에러를 발생시킨다', () => {
    expect(() => getCategoryFromNumber(6)).toThrow('[ERROR] 잘못된 카테고리 번호입니다.');
  });
});
```

### 예제 5: 배열/객체 테스트

```typescript
describe('getCategoryMenus', () => {
  it('일식 메뉴 목록을 반환한다', () => {
    const menus = getCategoryMenus(Category.JAPANESE);
    expect(menus).toContain('규동');
    expect(menus).toContain('우동');
    expect(menus.length).toBe(9);
  });
  
  it('반환된 메뉴 목록은 원본을 변경하지 않는다', () => {
    const menus1 = getCategoryMenus(Category.JAPANESE);
    const menus2 = getCategoryMenus(Category.JAPANESE);
    menus1.push('새메뉴');
    expect(menus2).not.toContain('새메뉴');
  });
});
```

---

## 테스트 실행 명령어

```bash
# 모든 테스트 실행
npm test

# Watch 모드 (파일 변경 시 자동 실행)
npm run test:watch

# 커버리지 확인
npm run test:coverage

# 특정 파일만 테스트
npm test Category.test.ts

# 특정 패턴만 테스트
npm test -- --testNamePattern="일식"
```

---

## 테스트 작성 체크리스트

- [ ] 모든 public 메서드에 대한 테스트가 있는가?
- [ ] 정상 케이스와 예외 케이스를 모두 테스트하는가?
- [ ] 테스트 설명이 명확한가? (한국어로)
- [ ] Mock을 적절히 사용하여 격리되어 있는가?
- [ ] beforeEach/afterEach로 중복 코드를 제거했는가?
- [ ] Given-When-Then 패턴을 따르는가?

---

## 팁

1. **테스트는 독립적으로**: 각 테스트는 다른 테스트에 의존하지 않아야 함
2. **명확한 설명**: 테스트 설명만 봐도 무엇을 테스트하는지 알 수 있어야 함
3. **한 번에 하나씩**: 하나의 테스트는 하나의 동작만 검증
4. **경계값 테스트**: 최소값, 최대값, 경계값을 반드시 테스트
5. **에러 케이스**: 정상 케이스뿐만 아니라 예외 케이스도 테스트


