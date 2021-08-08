import {initServices, services} from './services';
import {configureDesignSystem} from './utils/designSystem';

const {nav} = services;

export const start = async (): PVoid => {
  //1. configure design system
  configureDesignSystem();

  // 3. init services
  await initServices();

  // 4. start app
  nav.start('auth_screen');
};
