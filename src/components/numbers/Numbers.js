import './numbers.scss';

export const Numbers = ({
  from, to, odd, even
}) => {
  const arrAll = [];
  const arrOdd = [];
  const arrEven = [];
  let arr = [];

  for (let i = Number(from); i <= Number(to); i++) {
    arrAll.push(i);
    if (i % 2) {
      arrOdd.push(i);
    } else {
      arrEven.push(i);
    }
    // i % 2 ? arrOdd.push(i) : arrEven.push(i); - эта запись короче, но на нее ругается линтер
  }

  if (odd) {
    arr = [...arrOdd];
  } else if (even) {
    arr = [...arrEven];
  } else {
    arr = [...arrAll];
  }

  return (
    <ul className="numbers">
      {
        arr.map((item, index) => <li key={index}>{item}</li>)
      }
    </ul>
  );
};
