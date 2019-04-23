import React from 'react';

import './main.scss';

import { Greeting } from '../greeting';
import { Numbers } from '../numbers';
import { UsersList } from '../usersList';

const list = [
  { firstName: 'Oleg ', lastName: 'Kobzar ', age: 24 },
  { firstName: 'Ivan ', lastName: 'Ivanov ', age: 99 }
];

export const Main = () => (
  <main className="main">
    <Greeting name="Oleg" />
    <Numbers from="5" to="10" />
    <Numbers from="5" to="10" odd />
    <Numbers from="5" to="10" even />
    <UsersList users={list} />
    <a href="/one" title="Шутка, продолжения нет))">To be continue...</a>
  </main>
);
