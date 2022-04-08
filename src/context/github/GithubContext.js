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
    loading: false,
    repos: [],
    user: {}
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
      /// Something error when fetching so i just unactive soon
      headers: { Authorization: `"token ${GITHUB_TOKEN}"` }
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

  const fetchUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      /// Something error when fetching so i just unactive soon
      headers: { Authorization: `"token ${GITHUB_TOKEN}"` }
    });

    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();
      dispatch({
        type: 'FETCH_USER',
        payload: data
      });
    }
  };

  const getUserRepos = async (login) => {
    /// Call set loading
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: { Authorization: `"token ${GITHUB_TOKEN}"` }
      }
    );
    const data = await response.json();
    // setUsers(data);
    // setLoading(false);

    /// Dispatch action type to github Reducers
    dispatch({
      type: 'GET_REPOS',
      payload: data
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
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        fetchUser,
        getUserRepos
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
