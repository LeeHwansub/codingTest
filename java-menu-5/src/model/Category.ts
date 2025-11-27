export enum Category {
  JAPANESE = 1,
  KOREAN = 2,
  CHINESE = 3,
  ASIAN = 4,
  WESTERN = 5,
}

export const CategoryData = {
  [Category.JAPANESE]: {
    name: '일식',
    menus: ['규동', '우동', '미소시루', '스시', '가츠동', '오니기리', '하이라이스', '라멘', '오코노미야끼'],
  },
  [Category.KOREAN]: {
    name: '한식',
    menus: ['김밥', '김치찌개', '쌈밥', '된장찌개', '비빔밥', '칼국수', '불고기', '떡볶이', '제육볶음'],
  },
  [Category.CHINESE]: {
    name: '중식',
    menus: ['깐풍기', '볶음면', '동파육', '짜장면', '짬뽕', '마파두부', '탕수육', '토마토 달걀볶음', '고추잡채'],
  },
  [Category.ASIAN]: {
    name: '아시안',
    menus: ['팟타이', '카오 팟', '나시고렝', '파인애플 볶음밥', '쌀국수', '똠얌꿍', '반미', '월남쌈', '분짜'],
  },
  [Category.WESTERN]: {
    name: '양식',
    menus: ['라자냐', '그라탱', '뇨끼', '끼슈', '프렌치 토스트', '바게트', '스파게티', '피자', '파니니'],
  },
};

export function getCategoryFromNumber(number: number): Category {
  const categoryMap: { [key: number]: Category } = {
    1: Category.JAPANESE,
    2: Category.KOREAN,
    3: Category.CHINESE,
    4: Category.ASIAN,
    5: Category.WESTERN,
  };

  const category = categoryMap[number];
  if (!category) {
    throw new Error('[ERROR] 잘못된 카테고리 번호입니다.');
  }
  return category;
}

export function getCategoryName(category: Category): string {
  return CategoryData[category].name;
}

export function getCategoryMenus(category: Category): string[] {
  return [...CategoryData[category].menus];
}

