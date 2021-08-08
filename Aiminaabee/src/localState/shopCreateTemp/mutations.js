
export const updateShopTemp = shopCreateTempVar => {
  return payload => {
    let value = Object.values(payload)[0];
    const oldValues = shopCreateTempVar();
    const newValues = { ...oldValues, [Object.keys(payload)[0]]: value };
    shopCreateTempVar(newValues);
  };
};

export const clearShopTemp = shopCreateTempVar => {
  return () => {
    shopCreateTempVar({});
  };
};
