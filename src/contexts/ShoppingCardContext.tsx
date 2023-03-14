import { createContext } from "react";
import { Product } from "../interfaces/Product";

interface ShoppingCartContextType {
  cartItems: Product[];
  handleCancel: (id: number) => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType>({
  cartItems: [],
  handleCancel: () => {},
});

export default ShoppingCartContext;
