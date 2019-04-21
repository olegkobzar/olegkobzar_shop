import './numbers.scss';

export const Numbers = ({
  from, to, odd, even
}) => {
  const arr = [];

  for (let i = Number(from); i <= Number(to); i++) {
    arr.push(i);
  }

  if (odd) {
    return (
      <ul className="numbers">
        {
          arr.filter(number => number % 2).map((item, index) => <li key={index}>{item}</li>)
        }
      </ul>
    );
  }
  if (even) {
    return (
      <ul className="numbers">
        {
          arr.filter(number => !(number % 2)).map((item, index) => <li key={index}>{item}</li>)
        }
      </ul>
    );
  }

  return (
    <ul className="numbers">
      {
        arr.map((item, index) => <li key={index}>{item}</li>)
      }
    </ul>
  );
};
