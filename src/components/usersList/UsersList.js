import './usersList.scss';

const User = ({ data, showPosts }) => {
  const clickHandler = (event) => {
    event.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${data.id}`)
      .then(data => data.json())
      .then(posts => showPosts(posts));
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

export const UsersList = ({ list, showPosts }) => (
  <ul className="users">
    {
      list && list.map(data => (
        <User
          key={data.id}
          data={data}
          showPosts={showPosts}
        />
      ))
    }
  </ul>
);
