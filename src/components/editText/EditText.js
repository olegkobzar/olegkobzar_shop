import './editText.scss';

export class EditText extends Component {
  propsPl = {
    placeholder: 'Click on me and edit'
  }

  state = {
    hidden: false,
    text: this.propsPl.placeholder
  };

  handlerClick = () => {
    this.setState({ hidden: true });
  };

  handlerBlur = () => {
    this.setState({ hidden: false });

    const { text } = this.state;

    if (text === '') {
      this.setState({ text: this.propsPl.placeholder });
    }
  };

  handlerChange = ({ target }) => {
    this.setState({ text: target.value });
  };

  render() {
    const { hidden, text } = this.state;
    console.log(this.propsPl.placeholder);

    return (
      <div className="edit-text">
        {
          hidden
            ? (
              <input
                type="text"
                value={text || this.props.placeholder}
                onChange={this.handlerChange}
                onBlur={this.handlerBlur}
                autoFocus
              />
            )
            : <span onClick={this.handlerClick}>{text}</span>
        }
      </div>
    );
  }
}
