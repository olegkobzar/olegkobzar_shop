import './usersList.scss';

const User = ({ name, email }) => (
  <li>
    <span>{name}</span> -
    <strong> {email}</strong>
  </li>
);

export const UsersList = ({ users }) => (
  users && users.map(({ name, email, id }) => (
    <User key={id} email={email} name={name} />
  ))
);
