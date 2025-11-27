import { MenuRecommendationController } from './controller/MenuRecommendationController';

async function main() {
  const controller = new MenuRecommendationController();
  await controller.run();
}

main().catch((error) => {
  console.error('에러 발생:', error);
  process.exit(1);
});

