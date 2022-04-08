import axios from 'axios';
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `"token ${GITHUB_TOKEN}"` }
});

export const searchUsers = async (term) => {
  const params = new URLSearchParams({
    q: term
  });

  /// USING AXIOS
  const response = await github.get(`/search/users?${params}`);
  return response.data.items;

  /// USING FETCH
  // const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
  //   headers: { Authorization: `"token ${GITHUB_TOKEN}"` }
  // });
  // const { items } = await response.json();
  // return items;
};

export const fetchUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    /// Something error when fetching so i just unactive soon
    headers: { Authorization: `"token ${GITHUB_TOKEN}"` }
  });

  if (response.status === 404) {
    window.location = '/notfound';
  } else {
    const data = await response.json();
    return data;
  }
};

export const getUserRepos = async (login) => {
  /// Call set loading
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    headers: { Authorization: `"token ${GITHUB_TOKEN}"` }
  });
  const data = await response.json();
  // setUsers(data);
  // setLoading(false);
  return data;
};

// /// Clear data from users useContext
// const clearUsers = () => {
//   dispatch({
//     type: 'CLEAR_USERS'
//   });
// };

/// GEt user and repository
export const getUserAndRepos = async (login) => {
  //// Making 2 request
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`)
  ]);

  return {
    user: user.data,
    repos: repos.data
  };
};
