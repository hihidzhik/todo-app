import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function Task({ task, onToggle, onDelete, onEdit }) {
  const [timeLeft, setTimeLeft] = useState(task.time || 0);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  return (
    <li className={`${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            id="taskInput"
            className="edit"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleEditSubmit}
          />
        </form>
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
          <label htmlFor="taskInput">
            <span className="title">{task.title}</span>
            <span className="description">
              {formatTime(timeLeft)}
              <button
                type="button"
                aria-label="pause-play"
                className={`icon ${isRunning ? 'icon-pause' : 'icon-play'}`}
                onClick={() => setIsRunning(!isRunning)}
              />
            </span>
            <span className="created">{task.created}</span>
          </label>
          <button
            className="icon icon-edit"
            aria-label="edit"
            type="button"
            onClick={() => {
              setIsEditing(true);
              setEditedTitle(task.title);
            }}
          />
          <button type="button" className="icon icon-destroy" aria-label="delete" onClick={() => onDelete(task.id)} />
        </div>
      )}
    </li>
  );
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    created: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default Task;
