import './navigation.scss';

export const Navigation = ({ list }) => (
  <nav className="nav">
    <ul>
      {
        list.map((listItem, index) => <li key={index}><a href={`/${listItem.toLowerCase()}`}>{listItem}</a></li>)
      }
    </ul>
  </nav>
);
