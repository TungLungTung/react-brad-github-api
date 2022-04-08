import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  /// Reducers
  const initialState = {
    users: [],
    loading: false
  };

  /// Use Reducer Hook
  const [state, dispatch] = useReducer(githubReducer, initialState);

  /// get fetching user (testing purpose)
  const fetchUsers = async () => {
    /// Call set loading
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const data = await response.json();
    // setUsers(data);
    // setLoading(false);

    /// Dispatch action type to github Reducers
    dispatch({
      type: 'GET_USERS',
      payload: data
    });
  };

  const searchUsers = async (term) => {
    /// Call set loading
    setLoading();

    const params = new URLSearchParams({
      q: term
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: { Authorization: `token ${GITHUB_TOKEN}` }
    });
    const { items } = await response.json();
    // setUsers(data);
    // setLoading(false);

    /// Dispatch action type to github Reducers
    dispatch({
      type: 'GET_USERS_BY_SEARCH',
      payload: items
    });
  };

  /// Clear data from users useContext
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS'
    });
  };

  //// SET loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING'
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
