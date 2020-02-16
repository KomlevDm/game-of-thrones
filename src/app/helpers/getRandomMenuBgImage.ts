import { MENU_BACKGROUND_IMAGES } from 'src/assets/img/bg/image-list';

export function getRandomMenuBgImage(): string {
  const bgImageNames = Object.values(MENU_BACKGROUND_IMAGES);
  const randomIndex = Math.round(-0.5 + Math.random() * bgImageNames.length);

  return bgImageNames[randomIndex];
}
