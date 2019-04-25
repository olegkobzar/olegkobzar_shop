import React from 'react';

import './main.scss';

import { Greeting } from '../greeting';
import { Numbers } from '../numbers';
import { UsersList } from '../usersList';
import { Counter } from '../counter';

const list = [
  { firstName: 'Oleg ', lastName: 'Kobzar ', age: 24 },
  { firstName: 'Ivan ', lastName: 'Ivanov ', age: 99 }
];

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
      .then(users => this.setState({ users }))
  }

  render() {

    return (
      <main className="main">
        <Greeting name="Oleg" />
        <Numbers from="5" to="10" />
        <Numbers from="5" to="10" odd />
        <Numbers from="5" to="10" even />
        <UsersList users={list} />
        <Counter />
        <a href="/one" title="Шутка, продолжения нет))">To be continue...</a>
      </main>
    );
  }
}
