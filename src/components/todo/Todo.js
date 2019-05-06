import './todo.scss';

export class Todo extends Component {
  render() {
    const { list } = this.props;

    return (
      <ol className="todo">
        {
          list.map(({ id, title, completed }) => {
            const getClass = completed ? 'done' : '';

            return (
              <li key={id} className={getClass}>
                {title}
                <div className="todo__controlled">
                  <span>X</span>
                  <span>V</span>
                  <span>~</span>
                </div>
              </li>
            );
          })
        }
      </ol>
    );
  }
}
