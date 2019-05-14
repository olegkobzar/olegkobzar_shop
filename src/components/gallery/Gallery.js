import './gallery.scss';

import images from './images';

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
