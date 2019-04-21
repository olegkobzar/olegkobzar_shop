import './usersList.scss';

const User = ({ firstName, lastName, age }) => (
  <li>
    <span>{firstName}</span>
    <span>{lastName}</span>
    <span>{age}</span>
  </li>
);

export const UsersList = ({ users }) => (
  <ul>
    {
      users.map((user, i) => <User key={i} firstName={user.firstName} lastName={user.lastName} age={user.age} />)
    }
  </ul>
);
