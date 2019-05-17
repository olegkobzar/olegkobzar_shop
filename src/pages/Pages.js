import { PrivatePages } from './privatePages';
import { PublicPages } from './publicPages';

export class Pages extends Component {
  render() {
    const { user, onLogin } = this.props;

    return (
      <>
        {
          user
            ? <PrivatePages user={user} />
            : <PublicPages onLogin={onLogin} />
        }
      </>
    );
  }
}
