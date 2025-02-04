import React, {useEffect, useState} from 'react';
import {Button, Card, CardContent, List, ListItem, Paper, Typography} from '@mui/material';
import axios from "axios";
import {Task} from "../types/task";
import InboxIcon from '@mui/icons-material/Inbox';
import {useNavigate} from 'react-router-dom';
import ArchivedTaskOptionsMenu from "../components/ArchivedTaskOptionMenu";

const ArchivedTaskList = () => {
    const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<{ tasks: Task[] }>('http://localhost:3000/api/v1/tasks/archived')
            .then((response) => setArchivedTasks(response.data.tasks))
            .catch((error) => {
                alert('アーカイブ済みタスク一覧の取得に失敗しました。詳細: ' + error);
            });
    }, []);

    const unarchiveTask = (taskId: number) => {
        axios
            .patch<{ tasks: Task[] }>(`http://localhost:3000/api/v1/tasks/${taskId}/archive`, {
                task: {
                    archived: false,
                },
            })
            .then((response) => {
                setArchivedTasks(response.data.tasks);
            })
            .catch((error) => {
                alert('タスクのアーカイブに失敗しました。詳細: ' + error);
            });
    };


    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <InboxIcon style={{color: '#666', marginTop: '16px', marginBottom: '16px'}}/>
                <Button
                    variant="outlined"
                    color="primary"
                    sx={{ marginTop: '8px' }}
                    onClick={() => navigate('/')}
                >
                    戻る
                </Button>
            </div>


            <Paper sx={{padding: '16px', flex: 1, marginBottom: '16px'}}>
                <List>
                    {archivedTasks.map((task: Task) => (
                        <ListItem
                            sx={{padding: '5px 0'}}
                            key={task.id}
                        >
                            <Card variant="outlined" sx={{width: '100%'}}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{cursor: 'pointer'}}
                                    >
                                        {task.title}
                                    </Typography>
                                    <ArchivedTaskOptionsMenu task={task} unarchiveTask={unarchiveTask}/>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default ArchivedTaskList;
