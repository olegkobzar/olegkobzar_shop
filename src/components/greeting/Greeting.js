import './greeting.scss';

export const Greeting = ({ name }) => {
  const hours = new Date().getHours();

  const TagGreeting = ({ textIsName, text }) => {
    if (name) {
      return (
        <div className="greeting">
          <span>{textIsName}</span>
          <span className="greeting__name">{name}</span>
        </div>
      );
    }

    return (
      <div className="greeting">
        <span>{text}</span>
      </div>
    );
  };

  if (hours >= 22 && hours < 3) {
    return <TagGreeting textIsName="Good night, " text="Good night" />;
  }

  if (hours >= 3 && hours < 12) {
    return <TagGreeting textIsName="Good morning, " text="Good morning" />;
  }

  if (hours >= 12 && hours < 18) {
    return <TagGreeting textIsName="Good afternoon, " text="Good afternoon" />;
  }

  if (hours >= 18 && hours < 22) {
    return <TagGreeting textIsName="Good evening, " text="Good evening" />;
  }
};
