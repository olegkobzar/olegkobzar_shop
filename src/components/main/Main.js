import './main.scss';

export const Main = ({ children }) => (
  <main className="main">
    <div className="container">
      <div className="main__wrap">
        {children}
      </div>
    </div>
  </main>
);
