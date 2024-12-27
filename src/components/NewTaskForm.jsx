import { useState } from 'react';
import PropTypes from 'prop-types';


const NewTaskForm = ({ onAddTask }) => {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAddTask(title);
            setTitle('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </form>
    );
};

NewTaskForm.propTypes = {
    onAddTask: PropTypes.func.isRequired
};

NewTaskForm.defaultProps = {
    onAddTask: () => {}
};

export default NewTaskForm;
