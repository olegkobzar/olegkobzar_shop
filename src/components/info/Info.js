import './info.scss';

export class Info extends Component {
  state = {
    tasks: 10,
    done: 3,
    progress: 1,
    waiting: 5
  }

  toDo = () => {
    const {
      tasks, done, progress, waiting
    } = this.state;
    this.setState({
      tasks,
      done,
      progress,
      waiting
    });
  }

  render() {
    const {
      tasks, done, progress, waiting
    } = this.state;

    return (
      <div className="info">
        <span>Hello, UserName</span>
        <p>You have <b>{tasks}</b> tasks</p>
        <p>Done: <b>{done}</b></p>
        <p>In progress: <b>{progress}</b></p>
        <p>Waiting: <b>{waiting}</b></p>
        <a href="/link">Go to the task list</a>
      </div>
    );
  }
}
