import React from 'react';

import './main.scss';

import { Greeting } from '../greeting';
import { Numbers } from '../numbers';
import { UsersList } from '../usersList';
import { Counter } from '../counter';
import { Button } from '../button';
import { Info } from '../info';

export class Main extends Component {
  state = {
    users: []
  }

  constructor() {
    super();
    this.getUsers();
  }

  getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(data => data.json())
      .then(users => this.setState({ users }));
  }

  showUserInfo = ({ phone, name, website }) => {
    this.setState({ selectedUser: phone });
  }

  render() {
    const { user, element } = this.props;
    const { users, selectedUser } = this.state;

    return (
      <main className="main">
        <Greeting name="Oleg" />
        <Numbers from="5" to="10" />
        <Numbers from="5" to="10" odd />
        <Numbers from="5" to="10" even />
        <UsersList list={users} onClick={this.showUserInfo} />
        <div>Info: {selectedUser}</div>
        <Counter />
        <Button />
        <Info />
      </main>
    );
  }
}
