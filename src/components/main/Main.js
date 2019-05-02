import React from 'react';

import './main.scss';

import { Greeting } from '../greeting';
import { Numbers } from '../numbers';
import { UsersList } from '../usersList';
import { Counter } from '../counter';
import { Button } from '../button';
import { Info } from '../info';
import { Clock } from '../clock';

export class Main extends Component {
  state = {
    users: [],
    posts: []
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

  showUserInfo = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
      .then(data => data.json())
      .then(posts => this.setState({ posts }));
  }

  render() {
    const { users, posts } = this.state;

    return (
      <main className="main">
        <Greeting name="Oleg" />
        <Numbers from="5" to="10" />
        <Numbers from="5" to="10" odd />
        <Numbers from="5" to="10" even />
        <UsersList list={users} onClick={this.showUserInfo} />
        {posts.length !== 0
          && (
            <div className="posts">
              <h3>Posts:</h3>
              <ul>{posts.map((post, index) => <li key={index}>{post.body}</li>)}</ul>
            </div>
          )
        }
        <Counter />
        <Button />
        <Info />
        <Clock />
      </main>
    );
  }
}
