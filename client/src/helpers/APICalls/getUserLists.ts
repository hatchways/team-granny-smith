import { ListInterface } from '../../interface/List';

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
