export interface ProductInterface {
  _id: string;
  name: string;
  url: string;
  originalPrice: string;
  imageUrl: string;
  salePrice?: string;
  priceHistory?: string[];
}
