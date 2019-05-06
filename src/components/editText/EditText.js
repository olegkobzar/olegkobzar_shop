import './editText.scss';

export class EditText extends Component {
  state = {
    hidden: false,
    text: ''
  };

  handlerClick = () => {
    this.setState({ hidden: true });
  };

  handlerBlur = () => {
    this.setState({ hidden: false });
    this.callbackFunc('Some text');
  };

  callbackFunc = (el) => {
    console.log(el);
  }

  handlerChange = ({ target }) => {
    this.setState({ text: target.value });
  };

  render() {
    const { hidden, text } = this.state;
    const { placeholder } = this.props;

    return (
      <div className="edit-text">
        {
          hidden
            ? (
              <input
                type="text"
                value={text}
                placeholder={placeholder}
                onChange={this.handlerChange}
                onBlur={this.handlerBlur}
                autoFocus
              />
            )
            : <span onClick={this.handlerClick}>{text || placeholder}</span>
        }
      </div>
    );
  }
}
