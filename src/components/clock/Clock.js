import './clock.scss';

const date = new Date();

export class Clock extends Component {
  state = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  };

  componentDidMount() {
    this.interval = setInterval(() => this.changeClock(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  changeClock() {
    this.setState({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds()
    });
  }

  render() {
    const {
      year, month, day, hours, minutes, seconds
    } = this.state;

    return (
      <div className="clock">
        <h3>Clock:</h3>
        <time>
          <p>
            {day >= 10 ? day : `0${day}`}.
            {month >= 10 ? month : `0${month}`}.
            {year}
          </p>
          <p>{hours}:{minutes}:{seconds}</p>
        </time>
      </div>
    );
  }
}
