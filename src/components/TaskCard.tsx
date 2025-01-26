import React from 'react';
import TaskOptionsMenu from './TaskOptionMenu';
import {Card, CardContent, Typography} from "@mui/material";
import {Task, TaskStatusType} from "../types/task";

const TaskCard = ({task, handleTaskClick, onDelete}: {
    task: Task,
    handleTaskClick: (task: Task) => void;
    onDelete: (taskId: number, status: TaskStatusType) => void;
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
                    onClick={() => handleTaskClick(task)}
                    sx={{cursor: 'pointer'}}
                >
                    {task.title}
                </Typography>
                <TaskOptionsMenu onDelete={onDelete} taskId={task.id} status={task.status}/>
            </CardContent>
        </Card>

    );
};

export default TaskCard;
