import React, { useEffect, useState } from 'react';
import './UserList.css';

const intialUsers = [];

export default function UserList() {
  const [users, setUsers] = useState(intialUsers);
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => setUsers(json));
  }, [setUsers]);

  return (
  <ul className="user-list">
    {users.map(user => <UserItem key={user.id} user={user}/>)}
  </ul>);
}

function UserItem({user}) {
  return (
    <li className="user"><a href="#">{user.name}</a></li>
  )
}
