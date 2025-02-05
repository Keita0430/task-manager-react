import React, {useState} from 'react';
import axios from 'axios';
import {useLocation, useNavigate} from 'react-router-dom';
import {Box, Button, FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material';
import {Task} from "../types/task";
import AddTaskIcon from '@mui/icons-material/AddTask';
import MarkdownEditor from "../components/MarkdownEditor";

const TaskCreate = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('todo');
    const navigate = useNavigate();
    const location = useLocation();
    const groupedTasks = location.state?.groupedTasks || {};

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newPosition = (groupedTasks[status] || []).length + 1;

        axios.post<{ task: Task }>('http://localhost:3000/api/v1/tasks', {
            task: { title, description, status, position: newPosition }
        })
            .then(() => navigate('/'))
            .catch((error: unknown) => {
                alert('タスクの作成に失敗しました。詳細: ' + error);
            });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
            <AddTaskIcon style={{ color: '#666', marginTop: '16px'}} />
            <TextField
                label="タイトル"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            <MarkdownEditor value={description} onChange={setDescription} />
            <FormControl fullWidth margin="normal">
                <InputLabel id="status-label">ステータス</InputLabel>
                <Select
                    labelId="status-label"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="ステータス"
                >
                    <MenuItem value="todo">To Do</MenuItem>
                    <MenuItem value="in_progress">In Progress</MenuItem>
                    <MenuItem value="done">Done</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                作成
            </Button>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                sx={{ marginTop: '8px' }}
                onClick={() => navigate('/')}
            >
                キャンセル
            </Button>
        </Box>
    );
};

export default TaskCreate;
