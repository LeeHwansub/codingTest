export const OutputMessages = {
  START: '점심 메뉴 추천을 시작합니다.',
  RESULT_TITLE: '메뉴 추천 결과입니다.',
  COMPLETE: '추천을 완료했습니다.',
  INPUT_COACH_NAMES: '코치의 이름을 입력해 주세요. (, 로 구분)',
  INPUT_BANNED_MENUS: (coachName: string) => `${coachName}(이)가 못 먹는 메뉴를 입력해 주세요.`,
  TABLE_HEADER: '[ 구분 | 월요일 | 화요일 | 수요일 | 목요일 | 금요일 ]',
  CATEGORY_ROW_PREFIX: '[ 카테고리 |',
  COACH_ROW_PREFIX: (coachName: string) => `[ ${coachName} |`,
  ROW_SUFFIX: ' |',
} as const;

