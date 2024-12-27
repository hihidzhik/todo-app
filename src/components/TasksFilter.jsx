import PropTypes from 'prop-types';

const TasksFilter = ({ activeFilter, onFilterChange }) => {
    const filters = ['All', 'Active', 'Completed'];

    return (
        <ul className="filters">
            {filters.map((filter) => (
                <li key={filter}>
                    <button
                        className={filter === activeFilter ? 'selected' : ''}
                        onClick={() => onFilterChange(filter)}
                    >
                        {filter}
                    </button>
                </li>
            ))}
        </ul>
    );
};

TasksFilter.propTypes = {
    activeFilter: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired
};


TasksFilter.defaultProps = {
    activeFilter: 'All'
};

export default TasksFilter;
