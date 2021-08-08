import { Options, OptionsTopBar } from 'react-native-navigation';
import { Colors } from 'react-native-ui-lib';
import { Button, buttons } from './buttons';

export const navDefaultOptions = (): Options => {
  return {
    layout: {
      orientation: ['portrait'],
      componentBackgroundColor: Colors.bgColor,
      backgroundColor: Colors.bgColor,
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      backgroundColor: Colors.bgColor,
      hideShadow: true,
      elevation: 0,
    },
    bottomTab: {
      iconColor: Colors.textColor,
      textColor: Colors.textColor,
      selectedIconColor: Colors.textColor,
      selectedTextColor: Colors.textColor,
    },
    topBar: {
      background: {
        color: Colors.bgColor,
      },
      backButton: {
        color: Colors.textColor,
      },
      noBorder: true,
      elevation: 0,
      rightButtonColor: Colors.textColor,
      leftButtonColor: Colors.textColor,
      title: {
        color: Colors.black,
      },
    },
  };
};

export const withBottomTab = (
  text = 'Screen',
  icon = 'earth',
  selectedIcon = 'earth',
): Options => ({
  bottomTab: {
    text,
    icon: icon,
    selectedIcon: selectedIcon,
  },
});

export const withTitle = (text = 'Screen'): OptionsTopBar => ({
  title: { text },
});

export const withRightButtons = (...btns: Button[]): OptionsTopBar => ({
  rightButtons: btns.map((id) => buttons[id]),
});

export const withLeftButtons = (...btns: Button[]): OptionsTopBar => ({
  leftButtons: btns.map((id) => buttons[id]),
});
