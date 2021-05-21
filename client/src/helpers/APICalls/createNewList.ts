interface ListInterface {
  _id: string;
  name: string;
  products: string[];
  userId: string;
  image?: string;
}

const createNewList = async (name: string, userId: string, image?: string): Promise<ListInterface> => {
  const body = { name, image, userId };
  return await fetch('/list/addList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createNewList;
