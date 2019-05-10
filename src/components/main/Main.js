import React from 'react';

import './main.scss';

import { Form } from '../form';
import { Numbers } from '../numbers';
import { UsersList } from '../usersList';
import { Info } from '../info';
import { Clock } from '../clock';
import { EditText } from '../editText';
import { Todo } from '../todo';
import { InfoCategories } from '../infoCategories';
import { Tabs, Tab } from '../tabs';

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

  fn = text => console.log(text);

  render() {
    const {
      users, posts, todo, filterTodo
    } = this.state;

    return (
      <main className="main">
        <Tabs selectedIndex={this.state.tabIndex}>
          <Tab title="One">
            <h2>Hey</h2>
            <p>Lorem ipsum dolor sit amet...</p>
          </Tab>

          <Tab title="Two">
            <h2>Yo</h2>
            <p>Lorem ipsum dolor sit amet...</p>
          </Tab>
        </Tabs>
        <EditText placeholder="Click on me and edit" result={this.fn} />
        <input
          type="text"
          placeholder="Filter"
          value={filterTodo}
          onChange={this.setFilter}
        />
        <Todo list={todo.slice(0, 20).filter(this.filterTodos)} />
        <InfoCategories />
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
        <Info />
        <Clock />
      </main>
    );
  }
}
