import './taskList.scss';
import { Tabs, Tab } from '../tabs';
import { tasks } from './tasks.js';

export class TaskList extends Component {
  state = { tasks };

  dayTitle = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

  getCurrentDay = () => {
    const date = new Date();
    const indexNumber = date.getDay();

    if (indexNumber === 0) return 6;

    return indexNumber - 1;
  }

  render() {
    const { tasks } = this.state;

    return (
      <div className="task">
        <Tabs selectedIndex={this.getCurrentDay()}>
          {
            tasks.map((day, index) => (
              <Tab key={index} title={this.dayTitle[index]}>
                <ol> {
                  day.map(dayTask => (
                    <li key={dayTask.id} className={dayTask.done ? 'done' : ''}>
                      {dayTask.title}
                      <div className="task__controlled">
                        <span>X</span>
                        <span>V</span>
                        <span>~</span>
                      </div>
                    </li>)
                  )
                }
                </ol>
                <a href="">Добавить новый</a>
              </Tab>)
            )
          }
        </Tabs>
      </div>
    )
  }
}