import { useState } from 'react';
import './../styles/Tasks.css';
import Header from '../components/header';

interface Task {
    id: number;
    name: string;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');

    const handleCreateTask = () => {
        if (newTask.trim()) {
            const newTaskObj = { id: Date.now(), name: newTask };
            setTasks([...tasks, newTaskObj]);
            setNewTask('');
        }
    };

    const handleUpdateTask = (id: number) => {
        const updatedTaskName = prompt('Update task name:');
        if (updatedTaskName) {
            setTasks(tasks.map(task => (task.id === id ? { ...task, name: updatedTaskName } : task)));
        }
    };

    const handleDeleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <>
            <Header username={'Username'}></Header>
            <div className="tasks-container">
                <div className="task-form">
                    <input
                        id="new-task"
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="New task"
                    />
                    <button onClick={handleCreateTask}>Create</button>
                </div>
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <label>{task.name}</label>
                            <div>
                                <button onClick={() => handleUpdateTask(task.id)}>Update</button>
                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}