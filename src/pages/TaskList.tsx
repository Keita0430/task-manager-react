import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Task } from '../types/task';
import {List, ListItem, ListItemText, Typography, Paper, Button} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<{ tasks: Task[] }>('http://localhost:3000/api/v1/tasks')
            .then((response) => setTasks(response.data.tasks))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                タスク一覧
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/tasks/new')}
                style={{ marginBottom: '16px' }}
            >
                タスク作成
            </Button>
            <Paper
                elevation={3}
                sx={{padding: '16px', border: '1px solid #ccc'}}
            >
                {/* ヘッダー */}
                <div
                    style={{display: 'flex', padding: '8px 16px', borderBottom: '1px solid #ccc', backgroundColor: '#F0F8FF'}}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{flex: 1, fontWeight: 'bold', borderRight: '1px solid #ccc'}}
                    >
                        タイトル
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{flex: 2, fontWeight: 'bold', paddingLeft: '8px'}}
                    >
                        詳細
                    </Typography>
                </div>
                {/* タスクリスト */}
                <List>
                    {tasks.length === 0 ? (
                        <ListItem>
                            <ListItemText primary="タスクがありません。"/>
                        </ListItem>
                    ) : (
                        tasks.map((task, index) => (
                            <ListItem
                                key={task.id}
                                divider={index < tasks.length - 1}
                                sx={{display: 'flex', alignItems: 'center'}}
                            >
                                <Typography
                                    sx={{flex: 1, borderRight: '1px solid #ccc', wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}
                                >
                                    {task.title}
                                </Typography>
                                <Typography
                                    sx={{flex: 2, paddingLeft: '8px', wordWrap: 'break-word', whiteSpace: 'pre-wrap'}}
                                >
                                    {task.description}
                                </Typography>
                            </ListItem>
                        ))
                    )}
                </List>
            </Paper>
        </div>
    );
};

export default TaskList;
