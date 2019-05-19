import './category.scss';

export const Category = ({ match }) => (
  <div className="category">
    <h1>Category</h1>
    <strong>id is {match.params.id}</strong>
  </div>
);
