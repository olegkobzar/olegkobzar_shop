import './editText.scss';

export class EditText extends Component {
  state = {
    text: this.props.value,
    isEdit: this.props.edit || false
  };

  componentDidUpdate(prevProp) {
    const { value, edit } = this.props;

    if (prevProp.value !== value) {
      this.setState({ text: value }); // eslint-disable-line
    }
    if (prevProp.edit !== edit) {
      this.setState({ isEdit: edit }); // eslint-disable-line
    }
  }

  onClick = () => {
    const { onClick } = this.props;

    if (!this.state.isEdit && onClick) {
      onClick();
    }
    this.setState({ isEdit: true });
  };

  onBlur = (e) => {
    this.setState({ isEdit: false });
    if (this.props.onTextEdit) {
      this.props.onTextEdit(this.state.text);
    }
    this.props.result(e.target.value);
  };

  onChange = ({ target }) => {
    this.setState({ text: target.value });
  };

  typeEdit = () => {
    const { textarea, placeholder } = this.props;
    const { text } = this.state;
    const sett = {
      value: text,
      placeholder,
      onChange: this.onChange,
      onBlur: this.onBlur,
      autoFocus: true
    };

    return (
      textarea
        ? <textarea {...sett} />
        : <input type="text" {...sett} />
    );
  }

  render() {
    const { isEdit } = this.state;
    const { placeholder, value } = this.props;

    return (
      <div className="edit-text">
        {
          isEdit
            ? this.typeEdit()
            : <span onClick={this.onClick}>{value || placeholder}</span> // eslint-disable-line
        }
      </div>
    );
  }
}
