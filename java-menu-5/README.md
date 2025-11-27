# 점심 메뉴 추천 프로그램 (Jest/TypeScript 버전)

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 테스트 실행
npm test

# 테스트 watch 모드
npm run test:watch

# 테스트 커버리지
npm run test:coverage

# 빌드
npm run build

# 실행
npm start
```

## 프로젝트 구조

```
src/
├── model/              # 도메인 모델
│   ├── Category.ts
│   ├── Coach.ts
│   └── MenuRecommendation.ts
├── view/               # 뷰 (입출력)
│   ├── InputView.ts
│   └── OutputView.ts
├── service/            # 비즈니스 로직
│   └── MenuRecommendationService.ts
├── controller/         # 컨트롤러
│   └── MenuRecommendationController.ts
├── __tests__/         # Jest 테스트
│   ├── Category.test.ts
│   ├── Coach.test.ts
│   └── MenuRecommendation.test.ts
└── index.ts           # 진입점
```

## 기술 스택

- **TypeScript**: 타입 안정성
- **Jest**: 테스트 프레임워크
- **Node.js**: 런타임 환경

## MVC 패턴

- **Model**: `Category`, `Coach`, `MenuRecommendation`
- **View**: `InputView`, `OutputView`
- **Controller**: `MenuRecommendationController`
- **Service**: `MenuRecommendationService`

## 기능 요구 사항

한 주의 점심 메뉴를 추천해 주는 서비스입니다.

- 코치들은 월, 화, 수, 목, 금요일에 점심 식사를 같이 합니다.
- 메뉴를 추천하는 과정:
  1. 월요일에 추천할 카테고리를 무작위로 정합니다.
  2. 각 코치가 월요일에 먹을 메뉴를 추천합니다.
  3. 화, 수, 목, 금요일에 대해 위 과정을 반복합니다.
- 코치의 이름은 최소 2글자, 최대 4글자입니다.
- 코치는 최소 2명, 최대 5명까지 식사를 함께 합니다.
- 각 코치는 최소 0개, 최대 2개의 못 먹는 메뉴가 있습니다.
- 한 주에 같은 카테고리는 최대 2회까지만 고를 수 있습니다.
- 각 코치에게 한 주에 중복되지 않는 메뉴를 추천해야 합니다.

## 테스트

Jest를 사용한 단위 테스트 및 통합 테스트가 포함되어 있습니다.

```bash
npm test
```

## 프로그래밍 요구 사항

- TypeScript를 사용하여 타입 안정성을 보장합니다.
- MVC 패턴을 적용하여 코드 구조를 명확히 합니다.
- 함수의 길이는 15라인을 넘지 않도록 구현합니다.
- indent depth는 2까지만 허용합니다.
- else 예약어를 사용하지 않습니다.
