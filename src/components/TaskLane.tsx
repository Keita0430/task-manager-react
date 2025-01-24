import React from 'react';
import {Task, TaskStatusType} from '../types/task';
import {List, ListItem, Typography, Paper, Card, CardContent} from '@mui/material';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import TaskOptionsMenu from "./TaskOptionMenu";

const TaskLane = ({title, tasks, status, onDelete}: {
    title: string;
    tasks: Task[];
    status: TaskStatusType;
    onDelete: (taskId: number, status: TaskStatusType) => void;
}) => {
    // positionの昇順でソート
    const sortedTasks: Task[] = [...tasks].sort((a, b) => a.position - b.position);

    return (
        <Paper sx={{padding: '16px', flex: 1}}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>

            <Droppable droppableId={status} direction="vertical">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <List>
                            {sortedTasks.map((task: Task, index: number) => (
                                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                    {(provided) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{padding: '5px 0'}}
                                        >
                                            <Card variant="outlined" sx={{width: '100%'}}>
                                                <CardContent sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between'
                                                }}>
                                                    <Typography variant="body2">{task.title}</Typography>
                                                    <TaskOptionsMenu onDelete={onDelete} taskId={task.id} status={status}/>
                                                </CardContent>
                                            </Card>
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    </div>
                )}
            </Droppable>
        </Paper>
    );
};

export default TaskLane;
