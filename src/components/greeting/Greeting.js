import './greeting.scss';

export const Greeting = ({ name }) => {
  const hours = new Date().getHours();
  let text = 'Default greeting';

  if (hours >= 22 && hours < 3) {
    text = 'Good night';
  }

  if (hours >= 3 && hours < 12) {
    text = 'Good morning';
  }

  if (hours >= 12 && hours < 18) {
    text = 'Good afternoon';
  }

  if (hours >= 18 && hours < 22) {
    text = 'Good evening';
  }

  return (
    <div className="greeting">
      <span>{text}</span>
      {name && <span className="greeting__name">, {name}</span>} !
    </div>
  );
};
