import React from 'react';

import './main.scss';

import { Greeting } from '../greeting';
import { Form } from '../form';
import { Numbers } from '../numbers';
import { UsersList } from '../usersList';
import { Counter } from '../counter';
import { Button } from '../button';
import { Info } from '../info';
import { Clock } from '../clock';
import { EditText } from '../editText';
import { Todo } from '../todo';
import { InfoCategories } from '../infoCategories';

export class Main extends Component {
  state = {
    users: [],
    posts: [],
    todo: [],
    filterTodo: ''
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

  todoList = () => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(data => data.json())
      .then(todo => this.setState({ todo }));
  }

  componentDidMount() {
    this.getUsers();
    this.todoList();
  }

  setFilter = ({ target }) => {
    this.setState({ filterTodo: target.value });
  }

  filterTodos = (item) => {
    const { filterTodo } = this.state;

    return item.title.toLowerCase().includes(filterTodo);
  }

  render() {
    const {
      users, posts, todo, filterTodo
    } = this.state;

    return (
      <main className="main">
        <EditText placeholder="Click on me and edit" result={console.log(111)} />
        <input
          type="text"
          placeholder="Filter"
          value={filterTodo}
          onChange={this.setFilter}
        />
        <Todo list={todo.slice(0, 20).filter(this.filterTodos)} />
        <InfoCategories />
        <Greeting name="Oleg" />
        <Form />
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
