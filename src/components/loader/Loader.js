import './loader.scss';

export const Loader = ({ show }) => (
  show
    ? <div className="loader" />
    : null
);
