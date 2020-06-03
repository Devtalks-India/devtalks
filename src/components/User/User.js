import React from 'react';
import './user.css';
import List from "../List/List";

const User = ({ user = {} }) => {
  return (
      <div className="user">
        <div className="user__avatar">
          <div className="user__image"><img src={user.image} alt={user.name} /></div>
          <div className="user__name">{user.name}</div>
        </div>
        {user.pastEvent && <List title={user.pastEvent.title} description={`on ${user.pastEvent.date}`} />}
        <div className="user__social-accounts">
          {user.github && <a rel="noopener noreferrer" target="_blank" href={`https://github.com/${user.github}`} className="socialIcon"><i className="fa-github fab" /></a>}
          {user.linkedin && <a rel="noopener noreferrer" target="_blank" href={`https://www.linkedin.com/in/${user.linkedin}`} className="socialIcon"><i className="fa-linkedin fab" /></a>}
          {user.twitter && <a rel="noopener noreferrer" target="_blank" href={`https://twitter.com/${user.twitter}`} className="socialIcon"><i className="fa-twitter fab" /></a>}
        </div>
      </div>
  );
};

export default User;
