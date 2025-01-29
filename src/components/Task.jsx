import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';

function Task({ task, onToggle, onDelete, onEdit, onToggleTimer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const inputRef = useRef(null);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    setEditedTitle(task.title);
  }, [task.title]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedTitle.trim()) {
      onEdit(task.id, editedTitle.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <li className={`${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            ref={inputRef}
            className="edit"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleCancelEdit} // Выход по клику вне поля
            onKeyDown={(e) => e.key === 'Escape' && handleCancelEdit()}
          />
        </form>
      ) : (
        <div className="view">
          <input className="toggle" type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
          <label htmlFor="taskInput">
            <span className="title">{task.title}</span>
            <span className="description">
              {formatTime(task.timeLeft)}
              <button
                type="button"
                aria-label="pause-play"
                className={`icon ${task.isRunning ? 'icon-pause' : 'icon-play'}`}
                onClick={() => onToggleTimer(task.id)}
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
    timeLeft: PropTypes.number.isRequired,
    isRunning: PropTypes.bool.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onToggleTimer: PropTypes.func.isRequired,
};

export default Task;
