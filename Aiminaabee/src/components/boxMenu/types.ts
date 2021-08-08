export type controlType = {
  top: string;
  middle: string;
  bottom: string;
  customBottomView: string;
};

export type CardMenuType = {
  id?: number;
  name?: string;
  control: string;
  title: string;
  icon?: any;
  isTrue?: boolean;
  isRight?: boolean;
  valueRight?: string | number;
};
