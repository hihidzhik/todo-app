import { useState } from 'react';
import PropTypes from 'prop-types';

function NewTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalTime = parseInt(minutes || 0, 10) * 60 + parseInt(seconds || 0, 10);
    if (title.trim() && totalTime > 0) {
      onAddTask(title, totalTime);
      setTitle('');
      setMinutes('');
      setSeconds('');
    }
  };

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <input className="new-todo" placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        value={seconds}
        onChange={(e) => setSeconds(e.target.value)}
      />
      <button type="submit" style={{ display: 'none' }}>
        Add
      </button>
    </form>
  );
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default NewTaskForm;
