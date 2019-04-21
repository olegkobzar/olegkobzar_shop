import './navigation.scss';

export const Navigation = ({ list }) => {
  const slash = '/';

  return (
    <nav className="nav">
      <ul>
        {
          list.map((listItem, index) => <li key={index}><a href={slash + listItem.toLowerCase()}>{listItem}</a></li>)
        }
      </ul>
    </nav>
  );
};
