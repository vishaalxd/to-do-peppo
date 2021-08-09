
import './App.css';
import {useState } from 'react';
import { connect } from 'react-redux'
import { addTodo, updateList } from './state/action';
import addBlue from './assets/add-blue.svg';
import addGray from './assets/add-gray.svg';
import {TodoList,CompletedList} from './ListComponents';

const App = (props) => {
  const [checkFocus, setFocused] = useState(false)
  const [error, setError] = useState(null)
  const [value, setValue] = useState('')
  let filtered = props.list?.filter(each => !each.completed)
  let completedFilter = props.list?.filter(each => each.completed)


  const updateTask = () => {
    let task = document.getElementById('taskInput');
    if (!task.value.length) {
      setError('Please enter a task.')
    } else {
      props.addTodo(task.value);
      setValue('')
    }
  }

  const sortTasks = () => {
    let sortedArray = filtered.sort(function (a, b) {
      if (a.text < b.text) { return -1; }
      if (a.text > b.text) { return 1; }
      return 0;
    });
    sortedArray && props.updateList(sortedArray.concat(completedFilter))
  }

  const handleChange = (e) => {
    console.log(e.target.value.length)
    if (e.target.value.length === e.target.maxLength) {
      setError('Must be 20 character or less.')
    } else {
      setError('');
      setValue(e.target.value)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      updateTask()
    }
  }

  return (
    <div className="App">
      <header>
        Tasks
      </header>
      <main>
        <div className="main-wrapper">
          <div className="flexbox inputWrapper">
            <div className={error ? 'red-border inputbox' : 'inputbox'} >
              <img alt="add-img" className='add' src={!checkFocus ? addBlue : addGray}></img>
              <input type="text" id="taskInput" maxLength='20' placeholder="Add a task" onBlur={() => setFocused(false)} onFocus={() => setFocused(true)} onChange={e => { handleChange(e) }} onKeyDown={e => handleKeyDown(e)} value={value} />
            </div>
            <div className="buttonWrapper flexbox">
              <div className="button" role="button" onClick={updateTask}>Add</div>
              <div className="button" role="button" onClick={sortTasks}>Sort</div>
            </div>

          </div>
          <div className="error-log">{error}</div>
        </div>
        <div className="flexbox equalwidth">
          <TodoList list={props.list} updateList={props.updateList} />
          <CompletedList list={completedFilter} />
        </div>
      </main>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    list: state.todos
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (data) => dispatch(addTodo(data)),
    updateList: (data) => dispatch(updateList(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

