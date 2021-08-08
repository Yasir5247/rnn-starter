import React from 'react';

//controls
import { TopMenu } from './TopMenu';
import { MiddleMenu } from './MiddleMenu';
import { BottomMenu } from './BottomMenu';
import { CustomBottomMenu } from './CustomBottomMenu';

export const CardMenu = (props: any) => {
  const { control, ...rest } = props;

  switch (control) {
    case 'top':
      return <TopMenu {...rest} />;
    case 'middle':
      return <MiddleMenu {...rest} />;
    case 'bottom':
      return <BottomMenu {...rest} />;
    case 'customBottomView':
      return <CustomBottomMenu {...rest} />;
    default:
      return null;
  }
};
