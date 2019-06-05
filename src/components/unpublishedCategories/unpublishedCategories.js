import './unpublishedCategories.scss';

export class UnpublishedCategories extends Component {
  state = {
    value: ''
  }

  onDoubleClick = (id) => {
    const { onPublished } = this.props;

    onPublished(id);
  }

  setValue = ({ target }) => {
    this.setState({ value: target.value });
  }

  filter = category => category.title.toLowerCase().includes(this.state.value.toLowerCase());

  render() {
    const { value } = this.state;
    const { list } = this.props;

    return (
      <div className="unpublished">
        <input
          type="text"
          placeholder="Search"
          onChange={this.setValue}
          value={value}
        />
        <ul className="unpublished__list">
          {list
            .filter(this.filter)
            .map(item => (
              <li
                className="unpublished__list-item"
                title="Double click and add to publised"
                key={item.title}
                onDoubleClick={() => this.onDoubleClick(item.id)}
              >
                {item.title}
              </li>
            ))}
        </ul>
      </div>
    );
  }
}
