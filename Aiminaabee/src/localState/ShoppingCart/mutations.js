
export const addToShopingCart = (shoppingCartVar) => {

   return (payload) => {

      const oldValues = shoppingCartVar();

      const newValues = { ...oldValues }

      shoppingCartVar(newValues);
   }
}

export const removeShoppingCartItem = (shoppingCartVar) => {

   return () => {
      shoppingCartVar({});
   }

}