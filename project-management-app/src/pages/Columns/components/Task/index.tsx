import React from 'react';

import styles from './index.module.scss';

const { text, task } = styles;

const Task = () => {
  return (
    <div className={task}>
      <p className={text}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button className="icon-task-action"></button>
    </div>
  );
};

export default Task;
