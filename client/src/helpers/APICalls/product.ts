export interface ProductInterface {
  _id: string;
  name: string;
  url: string;
  price: string;
  imageUrl: string;
}

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

export { createNewProduct };
