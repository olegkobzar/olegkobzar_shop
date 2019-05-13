import './editText.scss';

export class EditText extends Component {
  state = {
    hidden: false,
    text: ''
  };

  handlerClick = () => {
    this.setState({ hidden: true });
  };

  handlerBlur = (e) => {
    this.setState({ hidden: false });
    // this.props.result(e.target.value);
  };

  handlerChange = ({ target }) => {
    this.setState({ text: target.value });
  };

  typeEdit = () => {
    const { textarea, placeholder } = this.props;
    const { text } = this.state;

    return (
      textarea
        ? <textarea
            value={text}
            placeholder={placeholder}
            onChange={this.handlerChange}
            onBlur={this.handlerBlur}
            autoFocus
          ></textarea>
        : <input
            type="text"
            value={text}
            placeholder={placeholder}
            onChange={this.handlerChange}
            onBlur={this.handlerBlur}
            autoFocus
          />
    );
  }

  render() {
    const { hidden, text } = this.state;
    const { placeholder } = this.props;

    return (
      <div className="edit-text">
        {
          hidden
            ? this.typeEdit()
            : <span onClick={this.handlerClick}>{text || placeholder}</span>
        }
      </div>
    );
  }
}
