import { Navigation, NavigationConstants, Options } from 'react-native-navigation';
import { gestureHandlerRootHOC as withGestureHandler } from 'react-native-gesture-handler';
import { withBottomTab, withRightButtons, withTitle } from '../../services/navigation/options';
import merge from 'lodash/merge';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Screen, screens, screensLayouts } from '../../registeredScreens';
import { withStores } from '../../stores';
import { withServices } from '../../services';
import { withClient } from '../../services/client';

import { BottomTabs, Component, Root, Stack } from './layout';
import { getTheme, withThemeModes } from '../../utils/designSystem';
import { navDefaultOptions } from './options';

export class Nav implements IService {
  private inited = false;

  // component ids of all presented screens
  private cIds: Map<string, Screen> = new Map();
  N = Navigation;

  // nav constants always updated on willAppear event
  C: NavigationConstants = {
    statusBarHeight: 0,
    backButtonId: '',
    topBarHeight: 0,
    bottomTabsHeight: 0,
  };

  init = async (): PVoid => {
    if (!this.inited) {
      await this.registerScreens();
      this.updateDefaultOptions();
      this.registerListeners();

      this.inited = true;
    }
  };

  // Start different apps' logic
  start = async (): PVoid => {
    const token = await AsyncStorage.getItem('@token');
    token ? await this.startThreeTabsApp() : await this.startOneScreenApp();

    await this.getConstants(); // needs to be called after setRoot()
  };

  private startOneScreenApp = async (): PVoid => {
    await Navigation.setRoot(Root(Stack(Component(screensLayouts.MainScreen))));
  };

  private startThreeTabsApp = async (): PVoid => {
    await Navigation.setRoot(
      Root(
        BottomTabs([
          Stack(Component(screensLayouts.MagicScreen)),
          Stack(Component(screensLayouts.ExploreScreen)),
          Stack(Component(screensLayouts.ShoppingCartScreen)),
          Stack(Component(screensLayouts.NotificationScreen)),
          Stack(Component(screensLayouts.ProfileScreen)),
        ]),
      ),
    );
  };

  // Navigation methods
  push = async <T>(cId: string, name: Screen, passProps?: T, options?: Options): PVoid => {
    const sl = screensLayouts[name];
    await this.N.push(
      cId,
      Component({
        ...sl,
        passProps,
        options: {
          ...sl.options,
          ...options,
        },
      }),
    );
  };

  pushWithTitle = async <T>(
    cId: string,
    name: Screen,
    title: string,
    passProps?: T,
    options?: Options,
  ): PVoid => {
    const sl = screensLayouts[name];
    await this.N.push(
      cId,
      Component({
        ...sl,
        passProps,
        options: {
          topBar: {
            ...withTitle(title),
            ...sl.options?.topBar,
          },
          ...options,
        },
      }),
    );
  };

  pushWithFunc = async (cId: string, name: Screen, passProps?: any): PVoid => {
    const sl = screensLayouts[name];
    await this.N.push(
      cId,
      Component({
        ...sl,
        passProps: {
          parentCatId: passProps.subCatId,
          parentCatName: passProps.subCatName,
          setFilters: (value: any) => passProps.setFilters && passProps.setFilters(value),
        },
      }),
    );
  };

  pop = async (cId: string): PVoid => {
    this.N.pop(cId);
  };

  popToRoot = async (cId: string): PVoid => {
    this.N.popToRoot(cId);
  };

  show = async <T>(name: Screen, passProps?: T, options?: Options): PVoid => {
    const sl = screensLayouts[name];
    this.N.showModal(
      Stack(
        Component({
          ...sl,
          passProps,
          options: {
            ...sl.options,
            ...options,
          },
        }),
      ),
    );
  };

  updateDefaultOptions = (cId = ''): void => {
    const options = this.getDefaultOptions();

    this.N.setDefaultOptions(options);
    if (this.cIds.has(cId)) {
      const name = this.cIds.get(cId);
      if (name) this.N.mergeOptions(cId, merge(options, screensLayouts[name].options));
    }
  };

  // System methods
  private registerScreens = async () => {
    screens.forEach((s) =>
      this.N.registerComponent(
        s.name,
        () => withGestureHandler(withClient(withStores(withServices(withThemeModes(s.component))))),
        () => s.component,
      ),
    );
  };

  private registerListeners = () => {
    this.N.events().registerComponentWillAppearListener(
      async ({ componentId: cId, componentName: cName }) => {
        if (!this.cIds.has(cId)) {
          this.cIds.set(cId, cName as Screen);
        }

        await this.getConstants();
      },
    );
  };

  private getDefaultOptions = (): Options => {
    const theme = getTheme();

    return {
      ...navDefaultOptions(),
      statusBar: { style: theme.statusBar, backgroundColor: theme.bgColor },
    };
  };

  private getConstants = async () => {
    const C = await this.N.constants();
    this.C = C;
    return C;
  };
}
