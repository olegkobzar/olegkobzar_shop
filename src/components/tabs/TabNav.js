import './tabs.scss';

export const TabNav = ({ list, select, selectedIndex }) => {
  const onClick = (e, index) => {
    select(index);
    e.preventDefault();
  };

  return (
    <nav className="nav-tab">
      <ul>
        {
          list.map((el, index) => (
            <li key={index}>
              <a href="#" onClick={e => onClick(e, index)} className={selectedIndex === index ? 'active' : ''}>
                {el}
              </a>
            </li>))
        }
      </ul>
    </nav>
  );
};
