import './counter.scss';

export class Counter extends Component {
  state = {
    counter: 0
  }

  clickHendler = () => {
    const { counter } = this.state;
    this.setState({
      counter: counter + 1
    });
  }

  render() {
    const { counter } = this.state;

    return (
      <>
        <button type="button" onClick={this.clickHendler} className="counter">Click</button>
        <p>{counter}</p>
      </>
    );
  }
}
