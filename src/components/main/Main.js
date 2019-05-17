import './main.scss';

export const Main = ({ children }) => (
  <div className="main">
    <main className="container">
      <div className="main__wrap">
        {children}
      </div>
    </main>
  </div>
);
