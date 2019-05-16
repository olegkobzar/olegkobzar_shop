import './gallery.scss';

const images = ["./images/html-logo.png", "./images/css-logo.svg", "./images/js-logo.png"]

export class Gallery extends Component {
  render() {
    return (
      <div className="gallery">
        {
          images.map((item, index) => <div key={index}><img src={item} alt="kyky" /></div>)
        }
      </div>
    );
  }
}
