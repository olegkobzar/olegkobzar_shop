import './editText.scss';

export class EditText extends Component {
  state = {
    hidden: false,
    text: 'Click on me and edit'
  };

  handlerClick = () => {
    this.setState({ hidden: true });
  };

  handlerBlur = () => {
    this.setState({ hidden: false });

    const { text } = this.state;

    if (text === '') {
      this.setState({ text: 'Click on me and edit' });
    }
  };

  handlerChange = ({ target }) => {
    this.setState({ text: target.value });
  };

  componentDidUpdate() {
    const { hidden } = this.state;

    if (hidden) this.nameInput.focus();
  }

  render() {
    const { hidden, text } = this.state;

    return (
      <div className="edit-text">
        {
          hidden
            ? (
              <input
                type="text"
                value={text}
                onChange={this.handlerChange}
                onBlur={this.handlerBlur}
                ref={input => this.nameInput = input}
              />
            )
            : <span onClick={this.handlerClick}>{text}</span>
        }
      </div>
    );
  }
}
