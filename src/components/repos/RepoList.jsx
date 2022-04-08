import PropTypes from 'prop-types';
import React from 'react';
import RepoItem from './RepoItem';

const Repolist = ({ repos }) => {
  return (
    <div className="rounded-lg shadow-lg card bg-base-100">
      <div className="card-body">
        <h2 className="text-3xl my-4 font-bold card-title">
          Top 10 Repositories
        </h2>
        {repos.map((repo) => {
          return <RepoItem key={repo.id} repo={repo} />;
        })}
      </div>
    </div>
  );
};

Repolist.propTypes = {
  repos: PropTypes.array.isRequired
};

export default Repolist;
