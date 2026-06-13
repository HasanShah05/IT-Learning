export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.cart.find(
        item => item.id === action.payload.id
      );

      if (exists) {
        return {
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };

    case "INCREASE_QTY":
      return {
        cart: state.cart.map(item =>
          item.id === action.id
            ? { ...item, qty: item.qty + 1 }
            : item
        ),
      };

    case "DECREASE_QTY":
      return {
        cart: state.cart
          .map(item =>
            item.id === action.id
              ? { ...item, qty: item.qty - 1 }
              : item
          )
          .filter(item => item.qty > 0),
      };

    case "REMOVE_ITEM":
      return {
        cart: state.cart.filter(item => item.id !== action.id),
      };

    case "CLEAR_CART":
      return { cart: [] };

    default:
      return state;
  }
}