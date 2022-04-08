const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const searchUsers = async (term) => {
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

  return items;
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
