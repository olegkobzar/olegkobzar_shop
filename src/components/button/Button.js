import './button.scss';

export class Button extends Component {
  state = {
    active: false
  }

  toggleClass = () => {
    const { active } = this.state;
    this.setState({
      active: !active
    });
  }

  render() {
    const { active } = this.state;

    return (
      <>
        <button
          type="button"
          className={active ? 'btn active' : 'btn'}
          onClick={this.toggleClass}
        >{active ? 'Hide' : 'Show'}
        </button>
        {active && <ToggleText />}
      </>
    );
  }
}

const ToggleText = () => (
  <div>
    <span>Текст, который то появляется, то пропадает, и еще кнопка получает класс active и меняется в ней текст</span>
  </div>
);
