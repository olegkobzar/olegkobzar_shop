import './usersList.scss';

const User = ({ data, onClick }) => {
  const clickHandler = (event) => {
    onClick(data);
    event.preventDefault();
  };
  const { name, email } = data;

  return (
    <li>
      <a href="#" onClick={clickHandler}>
        <strong>{name} -</strong>
        {email}
      </a>
    </li>
  );
};

export const UsersList = ({ list, onClick }) => (
  <ul className="users">
    {
      list && list.map(({ id, ...rest }) => (
        <User
          key={id}
          data={rest}
          onClick={onClick}
        />
      ))
    }
  </ul>
);
