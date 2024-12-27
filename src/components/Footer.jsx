import TasksFilter from './TasksFilter';
import PropTypes from 'prop-types';

const Footer = ({ activeFilter, onFilterChange, tasksLeft }) => (
    <footer className="footer">
        <span className="todo-count">{tasksLeft} items left</span>
        <TasksFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />
        <button className="clear-completed">Clear completed</button>
    </footer>
);

Footer.propTypes = {
    activeFilter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    tasksLeft: PropTypes.number.isRequired
};

Footer.defaultProps = {
    tasksLeft: 0
};

export default Footer;
