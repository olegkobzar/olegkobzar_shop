import './infoCategories.scss';

export class InfoCategories extends Component {
  state = {
    name: 'John',
    categories: 10,
    published: 3,
    products: 50
  }

  categories = () => {
    const {
      name, categories, published, products
    } = this.state;
    this.setState({
      name,
      categories,
      published,
      products
    });
  }

  render() {
    const {
      name, categories, published, products
    } = this.state;

    return (
      <div className="info-categories">
        <span>Hello, <b>{name}</b></span>
        <p>You have <b>{categories}</b> categories (<b>{published}</b> published)</p>
        <p>You have <b>{products}</b> products</p>
        <a href="/link">Go to categories</a>
      </div>
    );
  }
}
