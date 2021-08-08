import React from 'react';

//controls
import { TopMenu, MiddleMenu, BottomMenu, CustomBottomMenu } from './Rows';

import { CardMenuType } from './types';

interface CardMenuProps {
  data: CardMenuType;
  actions: {
    onPressMenu: (id: number | undefined, name: string | undefined) => void;
  };
}

export const CardMenu: React.FC<CardMenuProps> = ({ data, actions }: CardMenuProps) => {
  switch (data.control) {
    case 'top':
      return <TopMenu data={data} actions={actions} />;
    case 'middle':
      return <MiddleMenu data={data} actions={actions} />;
    case 'bottom':
      return <BottomMenu data={data} actions={actions} />;
    case 'customBottomView':
      return <CustomBottomMenu data={data} actions={actions} />;
    default:
      return null;
  }
};
