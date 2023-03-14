import React, { useMemo, useState } from "react";
import { Card, ResourceList, ResourceItem, Thumbnail, TextStyle, Stack } from "@shopify/polaris";
import { Product } from "../interfaces/Product";
import ShoppingCartContext from "../contexts/ShoppingCardContext";

interface Props {
  items: Product[];
  // isVisible: boolean;
  // onClose: () => void;
}

const calculateDiscountAndProfit = (product: Product) => {
  const discountPercentage = ((product.oldprice - product.newprice) / product.oldprice) * 100;
  return {
    discountPercentage: Math.round(discountPercentage),
    oldprice: product.oldprice,
  };
};

const ShoppingCart = ({ items }: Props) => {
  const [cartItems, setCartItems] = useState(items);

  const handleCancel = (id: number) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
    console.log("cartItems", cartItems);
  };

  const totalPrice = useMemo(() => {
    return items.reduce((total, product) => total + product.newprice, 0);
  }, [items]);

  return (
    <div style={{ position: "fixed", top: 10, right: 15, width: 400, padding: 10 }}>
      <Card title="Shopping Cart">
        <ResourceList
          items={items}
          // items={cartItems}
          renderItem={(product: Product) => {
            const { discountPercentage, oldprice } = calculateDiscountAndProfit(product);
            return (
              <ResourceItem
                id={product.id}
                media={<Thumbnail source={product.image ? product.image : ""} alt={product.name} />}
                onClick={() => console.log("ResourceItem clicked!")}
              >
                <Stack distribution="equalSpacing">
                  <Stack.Item fill>
                    <h3>
                      <TextStyle variation="strong">{product.name}</TextStyle>
                    </h3>
                    <p>
                      <TextStyle variation="subdued">
                        <s>${oldprice.toFixed(2)}</s> <TextStyle variation="positive">${product.newprice.toFixed(2)}</TextStyle> ({discountPercentage}% off)
                      </TextStyle>
                    </p>
                    <p>
                      <TextStyle variation="strong">Profit:</TextStyle>{" "}
                      <TextStyle variation={discountPercentage >= 0 ? "positive" : "negative"}>
                        {discountPercentage.toFixed(2)}% ({(product.newprice - product.oldprice).toFixed(2)}$)
                      </TextStyle>
                    </p>
                  </Stack.Item>
                  <Stack.Item>
                    <button onClick={() => handleCancel(product.id)} aria-label="Cancel">
                      Delete
                    </button>
                  </Stack.Item>
                </Stack>
              </ResourceItem>
            );
          }}
        />
        <div style={{ marginTop: "1rem" }}>
          <TextStyle variation="strong">Total Price:</TextStyle> <TextStyle variation="positive">${totalPrice.toFixed(2)}</TextStyle>
        </div>
      </Card>
    </div>
  );
};

export default ShoppingCart;
