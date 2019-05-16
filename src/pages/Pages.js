import { Route } from 'react-router-dom';

import { infoCategories } from './infoCategories';

export const Pages = () => {

  return (
    <Route
      path="/user"
      component={infoCategories}
    />
  );
};
