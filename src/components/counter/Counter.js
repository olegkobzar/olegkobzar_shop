import './counter.scss';

export class Counter extends Component {
  state = {
    counter: 0
  }

  clickHendler = () => {
    this.setState({
      counter: this.state.counter + 1
    })
  }

  render() {
    const { counter } = this.state;

    return (
      <>
        <button onClick={this.clickHendler} className="counter">Click</button>
        <p>{counter}</p>
      </>
    )
  }
}