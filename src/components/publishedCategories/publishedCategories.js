import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { EditText } from '../editText';

import './publishedCategories.scss';

export class PublishedCategories extends Component {
  state = {
    currentItemEdit: null
  }

  onClickEdit = (id) => {
    this.setState({ currentItemEdit: id });
  }

  onClickDelete = (id) => {
    const { deleteItem } = this.props;

    deleteItem(id);
  }

  onTitleChange = (id, title) => {
    const { editItem } = this.props;

    editItem(id, title);
    this.setState({ currentItemEdit: null });
  }

  onTitleClick = (id) => {
    const { titleClick } = this.props;

    titleClick(id);
  }

  resultText = text => console.log(text); // eslint-disable-line

  render() {
    const { list, hideEdit } = this.props;

    return (
      <ul className="published">
        {list.map(item => (
          <li className="published__item" key={item.title}>
            <EditText
              placeholder="Enter category name"
              value={item.title}
              onTextEdit={text => this.onTitleChange(item.id, text)}
              edit={this.state.currentItemEdit === item.id}
              onClick={() => this.onTitleClick(item.id)}
              result={this.resultText}
            />
            <div className="published__controll">
              <button type="button" className="published__controll-item" onClick={() => this.onClickEdit(item.id)}>
                <FaEdit />
              </button>
              {
                !hideEdit && (
                  <button
                    type="button"
                    className="published__controll-item"
                    onClick={() => this.onClickDelete(item.id)}
                  >
                    <FaTrashAlt />
                  </button>
                )
              }
            </div>
          </li>
        ))}
      </ul>
    );
  }
}
