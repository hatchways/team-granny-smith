export interface ListInterface {
  _id: string;
  name: string;
  products: string[];
  userId: string;
  image?: string;
}

const getUserLists = async (): Promise<{ data: ListInterface[] }> => {
  return await fetch(`/list/findList`, {
    method: 'Get',
    credentials: 'include',
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getUserLists;
