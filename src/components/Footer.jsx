import PropTypes from 'prop-types';

import TasksFilter from './TasksFilter';

function Footer({ activeFilter, onFilterChange, tasksLeft, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{tasksLeft} items left</span>
      <TasksFilter activeFilter={activeFilter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.propTypes = {
  activeFilter: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  tasksLeft: PropTypes.number.isRequired,
};

Footer.defaultProps = {};

export default Footer;
