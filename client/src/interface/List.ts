import { ProductInterface } from '../helpers/APICalls/product';

export interface ListInterface {
  _id: string;
  name: string;
  products: ProductInterface[];
  userId: string;
  isPrivate: boolean;
  image?: string;
}
