import './numbers.scss';

export const Numbers = ({
  from, to, odd, even
}) => {
  const arr = [];

  for (let i = Number(from); i <= Number(to); i++) {
    if (i % 2 && odd) {
      arr.push(i);
    } else if (!(i % 2) && even) {
      arr.push(i);
    } else if (!odd && !even) {
      arr.push(i);
    }
  }

  return (
    <ul className="numbers">
      {
        arr.map((item, index) => <li key={index}>{item}</li>)
      }
    </ul>
  );
};
