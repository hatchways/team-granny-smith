import { FunctionComponent } from 'react';
import { AuthContext } from '../context/useAuthContext';
import { mockLoggedInUser } from './mockUser';

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        loggedInUser: mockLoggedInUser,
        updateLoginContext: jest.fn(),
        logout: jest.fn(),
        isLoading: true
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockUseAuthProvider;
