import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from '../types/task';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get<{ tasks: Task[] }>('http://localhost:3000/api/v1/tasks')
            .then((response) => setTasks(response.data.tasks))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div>
            <h1>タスク一覧</h1>
            <ul>
                {tasks.length === 0 ? (
                    <li>タスクがありません。</li>
                ) : (
                    tasks.map((task) => (
                        <li key={task.id}>{task.title}: {task.description}</li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default TaskList;
