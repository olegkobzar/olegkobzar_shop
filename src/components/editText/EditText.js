import './editText.scss';

export class EditText extends Component {
  state = {
    hidden: false,
    text: this.props.value
  };

  handlerClick = (e) => {
    this.setState({ hidden: true });
  };

  handlerBlur = (e) => {
    this.setState({ hidden: false });
    this.props.result(e.target.value);
  };

  handlerChange = ({ target }) => {
    this.setState({ text: target.value });
  };

  typeEdit = () => {
    const { textarea, placeholder } = this.props;
    const { text } = this.state;
    const sett = {
      value: text,
      placeholder,
      onChange: this.handlerChange,
      onBlur: this.handlerBlur,
      autoFocus: true
    };

    return (
      textarea
        ? <textarea {...sett} />
        : <input type="text" {...sett} />
    );
  }

  render() {
    const { hidden } = this.state;
    const { placeholder, value } = this.props;

    return (
      <div className="edit-text">
        {
          hidden
            ? this.typeEdit()
            : <span onClick={this.handlerClick}>{value || placeholder}</span> // eslint-disable-line
        }
      </div>
    );
  }
}
