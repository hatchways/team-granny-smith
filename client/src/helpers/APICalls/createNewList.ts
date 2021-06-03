import { ListInterface } from '../../interface/List';

const createNewList = async (
  name: string,
  userId: string,
  isPrivate: boolean,
  image?: string,
): Promise<ListInterface> => {
  const body = { name, image, userId, isPrivate };
  return await fetch('/list/addList', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    credentials: 'include',
  })
    .then((response) => {
      return response.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createNewList;
