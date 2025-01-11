import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GroupedTasks, Task, TaskStatus } from '../types/task';
import {List, ListItem, ListItemText, Typography, Paper, Button, Card, CardContent} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<{ tasks: Task[] }>('http://localhost:3000/api/v1/tasks')
            .then((response) => setTasks(response.data.tasks))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    const groupedTasks: GroupedTasks = tasks.reduce((acc: GroupedTasks, task: Task) => {
        if (!acc[task.status]) {
            acc[task.status] = [];
        }
        acc[task.status].push(task);
        return acc;
    }, {});

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h4" gutterBottom>
                タスク一覧
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/tasks/new')}
                style={{ marginBottom: '16px', alignSelf: 'flex-start' }}
            >
                タスク作成
            </Button>

            {/* カンバン */}
            <div style={{ display: 'flex', gap: '5px', height: '85vh' }}>
                {Object.values(TaskStatus).map((status) => (
                    <Paper key={status} sx={{ padding: '16px', flex: 1 }}>
                        <Typography variant="h6" gutterBottom>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                        </Typography>
                        <List>
                            {(groupedTasks[status] || []).length === 0 ? (
                                <ListItem>
                                    <ListItemText primary="タスクがありません。" />
                                </ListItem>
                            ) : (
                                (groupedTasks[status] || []).map((task: Task) => (
                                    <ListItem key={task.id} sx={{ padding: '5px 0' }}>
                                        {/* タスクカード */}
                                        <Card variant="outlined" sx={{ width: '100%' }}>
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {task.title}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                ))
                            )}
                        </List>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

export default TaskList;
