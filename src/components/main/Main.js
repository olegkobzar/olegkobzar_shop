import './main.scss';

export const Main = ({ children }) => {
  return (
    <div className="main">
      <main className="container">
        <div className="main__wrap">
          {children}
        </div>
      </main>
    </div>
  );
}
