import upArrow from './assets/up-arrow.png';
import downArrow from './assets/down-arrow.png';
import {useState } from 'react';

export const TodoList = ({ list, updateList }) => {

  const [showAll, setShowAll] = useState(false)
  let filtered = list.filter(each => !each.completed)
  let completedFilter = list.filter(each => each.completed)
  /* 
  Update Completed Task handled within Component
  */
  const setCompleted = (event, { id }) => {
    event.target.checked = false;
    const completed = list.map((e) => {
      if (e.id === id) {
        e.completed = true;
      }
      return e;
    });
    updateList(completed)
  }

  /**
   * Rearrage Elements bassed on priority
   */
  const pushBottom = (idx) => {
    if (idx < filtered.length) {
      let currList = filtered.filter((e, count) => count !== idx);
      currList.splice(idx + 1, 0, filtered[idx]);
      updateList(currList.concat(completedFilter));
    }
  }
  const pushTop = (idx) => {
    if (idx > 0) {
      let currList = filtered.filter((e, count) => count !== idx);
      currList.splice(idx - 1, 0, filtered[idx]);
      updateList(currList.concat(completedFilter));
    }
  }

  return (<>
    <div className="to-do">
      <div className="heading">To-do</div>
      <br />
      <ul>
        {filtered.length ? filtered.slice(0, showAll ? filtered.length : 10).map((each, idx) => {
          return !each.completed && (<li> <input type="checkbox" onChange={(event) => setCompleted(event, each)} />{each.text}
            <> &nbsp;
              <img class="arrow" alt="sort-arrows" src={upArrow} onClick={e => pushTop(idx)} />
              <img class="arrow" alt="sort-arrows" src={downArrow} onClick={e => pushBottom(idx)} />
            </>
          </li>)
        }) : ''}
        {filtered.length > 10 && (!showAll ? <div className="heading" onClick={() => setShowAll(true)}><i>Load More...</i></div> : <div className="heading" onClick={() => setShowAll(false)}><i>Show less...</i></div>)}
      </ul>
    </div>
  </>)
}


export const CompletedList = ({ list }) => (<>
  <div className="to-do">
    <div className="heading">Completed</div>
    <br />
    <ul >
      {list.length ? list.map((each) => (<li> <input type="checkbox" defaultChecked={each.completed} checked={true} /><s>{each.text}</s></li>)) : null}
    </ul>
  </div>
</>)