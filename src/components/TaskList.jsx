import Task from './Task';
import PropTypes from 'prop-types';


const TaskList = ({ tasks, onToggle, onDelete }) => (
    <ul className="todo-list">
        {tasks.map((task) => (
            <Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
        ))}
    </ul>
);

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            created: PropTypes.string.isRequired
        })
    ).isRequired,
    onToggle: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TaskList;
