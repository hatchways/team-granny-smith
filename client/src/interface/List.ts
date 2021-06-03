import { ProductInterface } from './Product';

export interface ListInterface {
  _id: string;
  name: string;
  products: ProductInterface[];
  userId: string;
  isPrivate: boolean;
  image?: string;
}
