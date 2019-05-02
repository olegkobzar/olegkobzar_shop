import './usersList.scss';

const User = ({ data, onClick }) => {
  const clickHandler = (event) => {
    event.preventDefault();
    onClick(data.id);
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
      list && list.map(data => (
        <User
          key={data.id}
          data={data}
          onClick={onClick}
        />
      ))
    }
  </ul>
);
