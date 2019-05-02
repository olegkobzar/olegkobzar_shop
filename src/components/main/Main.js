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
    posts: [],
    isPostsTitle: false
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

  showPosts = (posts) => {
    this.setState({
      posts,
      isPostsTitle: true
    });
  }

  render() {
    const { users, posts, isPostsTitle } = this.state;

    return (
      <main className="main">
        <Greeting name="Oleg" />
        <Numbers from="5" to="10" />
        <Numbers from="5" to="10" odd />
        <Numbers from="5" to="10" even />
        <UsersList list={users} showPosts={this.showPosts} />
        {isPostsTitle
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
