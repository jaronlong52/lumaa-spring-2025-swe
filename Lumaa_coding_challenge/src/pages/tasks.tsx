import { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/Tasks.css';
import Header from '../components/header';

interface Task {
    id: number;
    title: string;
    isComplete: boolean;
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/tasks');
            console.log(response);
            setTasks(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async () => {
        setLoading(true);
        if (newTask.trim()) {
            try {
                const response = await axios.post('http://localhost:3001/tasks', { title: newTask });
                setTasks([...tasks, response.data]);
                setNewTask('');
            } catch (err) {
                console.error(err);
                setError('Failed to create task');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Task title cannot be empty');
        }
    };

    const handleEditTask = async (id: number) => {
        setLoading(true);
        const updatedTaskName = prompt('Update task name:');
        try {
            const response = await axios.put(`http://localhost:3001/tasks/${id}`, { title: updatedTaskName, isComplete: false });
            console.log(response);
            setTasks(tasks.map(task => (task.id === id ? response.data : task)));
        } catch (err) {
            console.error(err);
            setError('Failed to update task');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTask = async (id: number) => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3001/tasks/${id}`);
            setTasks(tasks.filter(task => task.id !== id));
        } catch (err) {
            console.error(err);
            setError('Failed to delete task');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header username={'Username'} />
            <div className="tasks-container">
                <div className="task-form">
                    <input
                        id="new-task"
                        type="text"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="New task"
                        aria-label="New task"
                    />
                    <button onClick={handleCreateTask} aria-label="Create task" disabled={!newTask.trim()}>Create</button>
                    {error && <div className="error">{error}</div>}
                </div>
                {loading ? (
                    <div>Loading tasks...</div>
                ) : (
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                <label>{task.title}</label>
                                <div>
                                    <button onClick={() => handleEditTask(task.id)} aria-label="Edit task">Edit</button>
                                    <button onClick={() => handleDeleteTask(task.id)} aria-label="Delete task">Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}