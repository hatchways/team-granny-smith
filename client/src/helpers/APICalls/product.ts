import { ProductInterface } from '../../interface/Product';

const createNewProduct = async (url: string, listId: string): Promise<ProductInterface> => {
  return await fetch('/product/addProduct', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url: url, id: listId }),
    credentials: 'include',
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      error: {
        message: 'Unable to connect to server. Please try again';
      }
    });
};

const deleteProduct = async (productId: string, listId: string): Promise<{ data: string }> => {
  return await fetch('/product/removeProduct', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, listId }),
    credentials: 'include',
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      error: {
        message: 'Unable to connect to server. Please try again';
      }
    });
};

export { createNewProduct, deleteProduct };
