import React, {useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {Task, TaskStatusType} from "../types/task";

const TaskEdit = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const task: Task = location.state?.task;

    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState(task?.status || 'todo');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios.put<{ task: Task }>(`http://localhost:3000/api/v1/tasks/${task.id}`, {
            task: { title, description, status }
        })
            .then(() => navigate('/'))
            .catch((error: unknown) => {
                alert('タスクの編集に失敗しました。詳細: ' + error);
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
            <h1>タスク編集</h1>
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
            <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">ステータス</InputLabel>
                <Select
                    labelId="status-label"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatusType)}
                    label="ステータス"
                >
                    <MenuItem value="todo">To Do</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                更新
            </Button>
        </Box>
    );
};

export default TaskEdit;
