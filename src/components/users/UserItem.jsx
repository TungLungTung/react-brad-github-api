import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Useritem = ({ user: { login, avatar_url } }) => {
  return (
    <div className="card shadow-md compact side bg-base-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={avatar_url} alt={login} />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title font-bold">{login}</h2>
          <Link
            className="text-base-content text-opaciry-40 text-md italic"
            to={`/users/${login}`}
          >
            visit profile
          </Link>
        </div>
      </div>
    </div>
  );
};

Useritem.propTypes = {
  user: PropTypes.object.isRequired
};

export default Useritem;
