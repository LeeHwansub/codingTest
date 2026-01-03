# tsconfig.json 설정 가이드

## 현재 설정 설명

```json
{
  "compilerOptions": {
    "target": "ES2020",              // 컴파일 대상 JavaScript 버전
    "module": "commonjs",            // 모듈 시스템 (Node.js용)
    "lib": ["ES2020"],               // 사용할 라이브러리 타입 정의
    "outDir": "./dist",              // 컴파일된 파일 출력 디렉토리
    "rootDir": "./src",              // 소스 코드 루트 디렉토리
    "strict": true,                  // 엄격한 타입 체크 활성화
    "esModuleInterop": true,        // CommonJS와 ES 모듈 호환성
    "skipLibCheck": true,            // 라이브러리 타입 체크 스킵 (빌드 속도 향상)
    "forceConsistentCasingInFileNames": true,  // 파일명 대소문자 일관성
    "resolveJsonModule": true,      // JSON 파일 import 허용
    "moduleResolution": "node",      // Node.js 스타일 모듈 해석
    "types": ["jest", "node"]       // 사용할 타입 정의 (Jest + Node.js)
  },
  "include": ["src/**/*"],          // 컴파일할 파일
  "exclude": ["node_modules", "dist"]  // 제외할 디렉토리
}
```

## 권장 설정 (일반적인 TypeScript 프로젝트)

```json
{
  "compilerOptions": {
    // 기본 설정
    "target": "ES2020",                    // 또는 "ES2022", "ESNext"
    "module": "commonjs",                  // Node.js: "commonjs", 브라우저: "ES2020"
    "lib": ["ES2020"],                     // 사용할 JavaScript API
    "outDir": "./dist",                    // 출력 디렉토리
    "rootDir": "./src",                    // 소스 루트
    
    // 타입 체크
    "strict": true,                        // 모든 strict 옵션 활성화
    "noImplicitAny": true,                // any 타입 암묵적 사용 금지
    "strictNullChecks": true,             // null/undefined 엄격 체크
    "strictFunctionTypes": true,          // 함수 타입 엄격 체크
    "strictBindCallApply": true,          // bind/call/apply 엄격 체크
    "strictPropertyInitialization": true,  // 클래스 속성 초기화 체크
    "noImplicitThis": true,               // this 타입 명시적 지정
    "alwaysStrict": true,                 // 항상 strict mode
    
    // 모듈 해석
    "moduleResolution": "node",           // Node.js 스타일
    "esModuleInterop": true,              // CommonJS <-> ES 모듈 호환
    "allowSyntheticDefaultImports": true,  // default import 허용
    "resolveJsonModule": true,            // JSON import 허용
    
    // 기타
    "skipLibCheck": true,                 // 라이브러리 타입 체크 스킵
    "forceConsistentCasingInFileNames": true,  // 파일명 대소문자 일관성
    "declaration": true,                  // .d.ts 파일 생성 (선택)
    "declarationMap": true,                // .d.ts.map 파일 생성 (선택)
    "sourceMap": true,                    // 소스맵 생성 (디버깅용)
    
    // 타입 정의
    "types": ["jest", "node"]             // Jest + Node.js 타입
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts"]  // 테스트 파일 제외 (선택)
}
```

## 프로젝트 타입별 권장 설정

### Node.js 백엔드 프로젝트 (현재 프로젝트)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "moduleResolution": "node",
    "types": ["jest", "node"]
  }
}
```

### 브라우저 프론트엔드 프로젝트
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020", "DOM"],
    "moduleResolution": "node",
    "types": ["jest"]
  }
}

### Next.js / React 프로젝트
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "node"
  }
}
```

## 현재 프로젝트에 추가하면 좋은 설정

```json
{
  "compilerOptions": {
    // ... 기존 설정 ...
    
    // 추가 권장 설정
    "sourceMap": true,                    // 디버깅용 소스맵
    "noUnusedLocals": true,               // 사용하지 않는 지역 변수 경고
    "noUnusedParameters": true,          // 사용하지 않는 매개변수 경고
    "noImplicitReturns": true,            // 함수의 모든 경로에서 return 체크
    "noFallthroughCasesInSwitch": true    // switch 문 fallthrough 방지
  }
}
```


