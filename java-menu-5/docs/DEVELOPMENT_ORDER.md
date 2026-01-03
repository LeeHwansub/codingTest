# 개발 순서 가이드

## 의존성 그래프 분석

```
Constants (의존성 없음) ← 가장 먼저!
  ↓
Model (Constants에만 의존)
  ├─ Category (독립적)
  ├─ Coach (독립적)
  └─ MenuRecommendation (Category + Coach 사용)
  ↓
View, Service (Model + Constants에 의존)
  ├─ InputView
  ├─ OutputView
  └─ MenuRecommendationService
  ↓
Controller (View + Service + Model에 의존)
  └─ MenuRecommendationController
  ↓
Application (Controller에만 의존)
  └─ index.ts
```

## 권장 개발 순서 (의존성 순서대로)

### 1단계: Constants (의존성 없음) ⭐ 가장 먼저!
```
1. src/constants/Constants.ts
2. src/constants/ErrorMessages.ts
3. src/constants/OutputMessages.ts
```
**이유:** 다른 모든 파일이 이 상수들을 사용하므로 가장 먼저 작성

### 2단계: Model (Constants에만 의존)
```
1. src/model/Category.ts        ← 독립적, 다른 Model에 의존 없음
2. src/model/Coach.ts           ← Category와 독립적
3. src/model/MenuRecommendation.ts  ← Category + Coach 사용
```

### 3단계: View (Model + Constants에 의존)
```
1. src/view/InputView.ts        ← Model 의존 적음
2. src/view/OutputView.ts      ← Model 의존 많음
```

### 4단계: Service (Model + Constants에 의존)
```
1. src/service/MenuRecommendationService.ts
```

### 5단계: Controller (모든 것에 의존)
```
1. src/controller/MenuRecommendationController.ts
```

### 6단계: Application (Controller에만 의존)
```
1. src/index.ts
```

## TDD 방식으로 작성할 때

각 파일마다:
1. **테스트 작성** (Red) - `src/__tests__/XXX.test.ts`
2. **최소 구현** (Green) - `src/XXX.ts`
3. **리팩토링** (Refactor)

## 실제 작성 순서 (TDD)

```
1. Constants 작성
   ✅ Constants.ts
   ✅ ErrorMessages.ts
   ✅ OutputMessages.ts

2. Category
   ✅ Category.test.ts 작성 → 실패 확인
   ✅ Category.ts 구현 → 테스트 통과

3. Coach
   ✅ Coach.test.ts 작성 → 실패 확인
   ✅ Coach.ts 구현 → 테스트 통과

4. MenuRecommendation
   ✅ MenuRecommendation.test.ts 작성 → 실패 확인
   ✅ MenuRecommendation.ts 구현 → 테스트 통과

5. InputView
   ✅ InputView.test.ts 작성 → 실패 확인
   ✅ InputView.ts 구현 → 테스트 통과

6. OutputView
   ✅ OutputView.test.ts 작성 → 실패 확인
   ✅ OutputView.ts 구현 → 테스트 통과

7. MenuRecommendationService
   ✅ MenuRecommendationService.test.ts 작성 → 실패 확인
   ✅ MenuRecommendationService.ts 구현 → 테스트 통과

8. MenuRecommendationController
   ✅ MenuRecommendationController.test.ts 작성 → 실패 확인
   ✅ MenuRecommendationController.ts 구현 → 테스트 통과

9. Application
   ✅ index.ts 구현
```

## 의존성 체크 방법

각 파일 작성 전:
1. 파일 상단의 `import` 문 확인
2. 의존하는 파일이 이미 작성되었는지 확인
3. 없다면 의존하는 파일부터 작성

## 팁

- **의존성이 없는 것부터**: Constants → Category → Coach 순서
- **테스트 먼저**: 각 파일 작성 전 테스트 작성
- **작은 단위로**: 한 번에 하나의 파일/기능만
- **커밋 자주**: 각 단계마다 커밋
