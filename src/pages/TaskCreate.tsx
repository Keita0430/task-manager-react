import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box } from '@mui/material';
import {Task} from "../types/task";

const TaskCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        axios.post<{ task: Task }>('http://localhost:3000/api/v1/tasks', {
            task: { title, description }
        })
            .then(() => navigate('/'))
            .catch((error: unknown) => console.error('Error creating task:', error));
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
            <h1>タスク作成</h1>
            <TextField
                label="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <TextField
                label="説明"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                作成
            </Button>
        </Box>
    );
};

export default TaskCreate;
