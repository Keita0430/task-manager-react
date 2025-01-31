import React from 'react';
import TaskOptionsMenu from './TaskOptionMenu';
import {Card, CardContent, Typography} from "@mui/material";
import {Task} from "../types/task";

const TaskCard = ({task, openTaskDetailModal, onDelete, onArchive}: {
    task: Task,
    openTaskDetailModal: (task: Task) => void;
    onDelete: (taskId: number) => void;
    onArchive: (taskId: number) => void;
}) => {

    return (
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
                    onClick={() => openTaskDetailModal(task)}
                    sx={{cursor: 'pointer'}}
                >
                    {task.title}
                </Typography>
                <TaskOptionsMenu onDelete={onDelete} onArchive={onArchive} task={task}/>
            </CardContent>
        </Card>

    );
};

export default TaskCard;
