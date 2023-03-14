import React, { useState } from "react";
import { TextField, Button, Stack, Select, Card, TextStyle, Thumbnail, ResourceList, ResourceItem, Page, Layout, TextStyleProps } from "@shopify/polaris";
import { Filter, Product } from "../interfaces/Product";
import ProductFilter from "../components/ProductFilter";
import { stockData } from "../stockData";
import ShoppingCart from "../components/ShoppingCart";

interface CustomTextStyleProps extends TextStyleProps {
  style?: React.CSSProperties;
}

const CustomTextStyle = ({ style, children, ...props }: CustomTextStyleProps) => {
  const customStyle = {
    textDecoration: "line-through",
    ...(style ?? {}),
  };
  return (
    <TextStyle {...props}>
      <span style={customStyle}>{children}</span>
    </TextStyle>
  );
};

const ProductListPage = () => {
  const [filters, setFilters] = useState<Filter>({
    name: "",
    description: "",
    tags: [],
    oldprice: 0,
    newprice: 0,
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const handleFiltersChange = (field: keyof Filter, value: any) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
    setIsCartOpen(true);
    console.log(value);
  };

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
  };

  const filteredProducts = ProductFilter(stockData, filters);

  return (
    <Page fullWidth>
      <div style={{ width: "70%" }}>
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <Stack distribution="equalSpacing" wrap={true}>
                  <TextField label="Filtered by Name" value={filters.name} onChange={(value) => handleFiltersChange("name", value)} autoComplete="off" />
                  <TextField
                    label="Filtered by Description"
                    value={filters.description}
                    onChange={(value) => handleFiltersChange("description", value)}
                    autoComplete="off"
                  />
                  <Select
                    label="Filtered by Tags"
                    value={filters.tags.join(",")}
                    onChange={(value) => handleFiltersChange("tags", value.split(","))}
                    options={[
                      { label: "tag1", value: "tag1" },
                      { label: "tag2", value: "tag2" },
                      { label: "tag3", value: "tag3" },
                    ]}
                  />
                  <Button
                    onClick={() =>
                      setFilters({
                        name: "",
                        description: "",
                        tags: [],
                        minPrice: undefined,
                        maxPrice: undefined,
                        oldprice: 0,
                        newprice: 0,
                      })
                    }
                  >
                    Clear Filters
                  </Button>
                </Stack>
              </Card.Section>
              <Card.Section>
                {/* <div>
                <ShoppingCart open onClose={() => setIsCartOpen(false)} />
              </div> */}
                <ResourceList
                  items={filteredProducts}
                  renderItem={(product: Product) => (
                    <ResourceItem
                      id={product.id}
                      media={<Thumbnail source={product.image ? product.image : ""} alt={product.name} />}
                      onClick={() => console.log("item clicked")}
                    >
                      <div style={{ display: "flex", justifyContent: "right" }}>
                        <Button onClick={() => handleAddToCart(product)}>Add to cart</Button>
                      </div>
                      <ShoppingCart items={cartItems} />
                      {/* {isCartOpen && <ShoppingCart open onClose={() => setIsCartOpen(false)} />} */}
                      <Stack distribution="equalSpacing">
                        <Stack.Item>
                          <h3>
                            <TextStyle variation="strong">{product.name}</TextStyle>
                          </h3>
                          <p>{product.description}</p>
                          <p>
                            <TextStyle variation="subdued">
                              <b>Product Category :</b> {product.category}
                            </TextStyle>
                          </p>
                          <p>
                            <TextStyle variation="subdued">
                              <b>Tags: </b>
                              {product.tags.join(", ")}
                            </TextStyle>
                          </p>
                          <p>
                            <TextStyle variation="positive">
                              <b>New Price:</b>
                              {` $${product.newprice}`}
                            </TextStyle>
                            <br />
                            {product.oldprice > 0 && (
                              <>
                                {" "}
                                <br />
                                <CustomTextStyle variation="negative" style={{ textDecoration: "line-through" }}>
                                  <b>Old Price: </b>
                                  {`$${product.oldprice}`}
                                </CustomTextStyle>
                                <br />
                                <TextStyle variation="subdued">
                                  <b>Discaunt Ratio:</b>
                                  {` (-${(((product.oldprice - product.newprice) / product.oldprice) * 100).toFixed(0)}%)`}
                                </TextStyle>
                              </>
                            )}
                          </p>
                        </Stack.Item>
                      </Stack>
                    </ResourceItem>
                  )}
                />
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
  );
};

export default ProductListPage;
