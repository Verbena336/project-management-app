import React from 'react';

import styles from './index.module.scss';

const { line, text, task } = styles;

const Task = () => {
  return (
    <div className={task}>
      <div className={line}></div>
      <p className={text}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <button className="icon-task-action"></button>
    </div>
  );
};

export default Task;
