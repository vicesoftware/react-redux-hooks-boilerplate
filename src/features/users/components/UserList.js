import React, { useEffect, useState } from "react";
import "./UserList.css";
import { Link } from "react-router-dom";

const intialUsers = [];

function useUsers() {
  const [users, setUsers] = useState(intialUsers);
  useEffect(() => {
    console.log("before ======");
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUsers(json));
  }, [setUsers]);

  return { users, setUsers };
}

export default function UserList() {
  const { users } = useUsers();

  return (
    <ul className="user-list">
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  );
}

function UserItem({ user }) {
  const to = `/users/${user.id}`;

  return (
    <li className="user">
      <Link to={to}>{user.name}</Link>
    </li>
  );
}
