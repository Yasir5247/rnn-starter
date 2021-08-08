import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { NavigationComponentProps, NavigationFunctionComponent } from 'react-native-navigation';
import { Colors, Spacings, Typography, Assets } from 'react-native-ui-lib';
import omit from 'lodash/omit';

import { useServices } from '../services';
import { stores } from '../stores';

const { ui } = stores;

const colors: ThemeColors = {
  primary: '#5383b8', // blue
  secondary: '#469c57', // green
  accent: '#fed330', // yellow
  btnBg: '#2C2F33',
  yellow: '#FDEA01',
  greyish: '#f2f2f2',
  black: '#000000',
  white: '#FFFFFF',
  errorColor: Colors.red,
  blackish: Colors.rgba(20, 20, 20, 1),
  blackish2: Colors.rgba(50, 50, 50, 1),
  whitish: Colors.rgba(250, 250, 250, 1),
  whitish2: Colors.rgba(230, 230, 230, 1),
};

const defaultTheme: Theme = {
  statusBar: 'dark',
  textColor: colors.blackish,
  textWhite: colors.white,
  iconColor: colors.black,
  bgColor: colors.whitish,
  btnBg: colors.btnBg,
  bg2Color: '#f2f2f2',
  cardBoxbg: '#EDF0F2',
  textInputUnderlineColor: '#cccc',
};

const themeModes: Record<ThemeMode, Theme> = {
  light: defaultTheme,
  dark: {
    statusBar: 'light',
    textColor: colors.whitish,
    textWhite: colors.white,
    iconColor: colors.white,
    bgColor: colors.blackish,
    bg2Color: colors.blackish2,
    cardBoxbg: '#EDF0F2',
    textInputUnderlineColor: Colors.white,
  },
};

export const configureDesignSystem = (): void => {
  Colors.loadColors({ ...colors, ...getThemeColors() });

  Assets.loadAssetsGroup('icons', {
    appIcon: require('../assets/images/appIcon.png'),
    appDescImage: require('../assets/images/appDescImage.jpg'),
  });

  Assets.loadAssetsGroup('tabIcons', {
    heart: require('../assets/customIcons/MagicCardIcons/heart.png'),
    heartSelected: require('../assets/customIcons/MagicCardIcons/Selected/heartSelected.png'),
    bookmark: require('../assets/customIcons/MagicCardIcons/bookmark.png'),
    bookmarkSelected: require('../assets/customIcons/MagicCardIcons/Selected/bookmarkSelected.png'),
  });

  Typography.loadTypographies({
    hotlable: { fontSize: 12 },
    lightHeading: { fontSize: 16 },
    boldHeading: { fontSize: 16, fontWeight: '600' },
    light: { fontSize: 16 },
    bold: { fontSize: 16, fontWeight: '600' },
    h1: { fontSize: 14 },
    h2: { fontSize: 14, fontWeight: 'bold' },
  });

  Spacings.loadSpacings({
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  });
};

export const getThemeColors = (): ThemeColors => omit(themeModes[ui.themeMode], 'statusBar');
export const getTheme = (): Theme => themeModes[ui.themeMode];

export const withThemeModes = (C: NavigationFunctionComponent): NavigationFunctionComponent => {
  return observer((props: NavigationComponentProps): React.ReactElement => {
    const { nav } = useServices();
    Colors.loadColors({ ...colors, ...getThemeColors() });
    useEffect(() => {
      nav.updateDefaultOptions(props.componentId);
    }, [ui.themeMode]);
    return <C {...props} key={ui.themeMode} />;
  });
};
