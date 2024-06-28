import React from 'react';

const SideBar = ({ users }) => {
  return (
    <div className="sidebar">
      <h2>Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
