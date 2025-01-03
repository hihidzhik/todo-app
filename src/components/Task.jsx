import PropTypes from 'prop-types';

const Task = ({ task, onToggle, onDelete }) => {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />
        <label>
          <span className="description">{task.title}</span>
          <span className="created">{task.created}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={() => onDelete(task.id)}></button>
      </div>
    </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    created: PropTypes.string.isRequired,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Task;
