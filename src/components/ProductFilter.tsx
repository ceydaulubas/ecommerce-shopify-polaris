import { Product } from "../interfaces/Product";
import { Filter } from "../interfaces/Product";

const ProductFilter = (products: Product[], filters: Filter): Product[] => {
  return products.filter((product) => {
    if (filters.name && !product.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    if (filters.description && !product.description.toLowerCase().includes(filters.description.toLowerCase())) {
      return false;
    }
    if (filters.tags.length > 0 && !filters.tags.some((tag) => product.tags.includes(tag))) {
      return false;
    }
    return true;
  });
};

export default ProductFilter;
