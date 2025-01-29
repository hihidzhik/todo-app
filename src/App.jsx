import { useEffect, useState } from 'react';

import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTaskForm';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('All');

  const addTask = (title, time) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
      created: new Date().toLocaleString(),
      time,
      timeLeft: time,
      isRunning: false,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTimer = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, isRunning: !task.isRunning } : task)));
  };

  const updateTimers = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.isRunning && task.timeLeft > 0 ? { ...task, timeLeft: task.timeLeft - 1 } : task))
    );
  };

  useEffect(() => {
    const timer = setInterval(updateTimers, 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTask = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  const editTask = (id, newTitle) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, title: newTitle } : task)));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'Active') return !task.completed;
    if (filter === 'Completed') return task.completed;
    return true;
  });

  const tasksLeft = tasks.filter((task) => !task.completed).length;

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={addTask} />
      </header>
      <section className="main">
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
          onToggleTimer={toggleTimer}
        />
      </section>
      <Footer activeFilter={filter} onFilterChange={setFilter} tasksLeft={tasksLeft} clearCompleted={clearCompleted} />
    </section>
  );
}

export default App;
