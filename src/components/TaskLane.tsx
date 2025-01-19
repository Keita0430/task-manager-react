import React from 'react';
import {Task, TaskStatusType} from '../types/task';
import {List, ListItem, Typography, Paper, Card, CardContent} from '@mui/material';
import {Droppable, Draggable} from 'react-beautiful-dnd';

const TaskLane = ({title, tasks, status}: {
    title: string;
    tasks: Task[];
    status: TaskStatusType;
}) => {
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
                            {tasks.map((task: Task, index: number) => (
                                <Draggable key={task.id} draggableId={String(task.id)} index={index}>
                                    {(provided) => (
                                        <ListItem
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{padding: '5px 0'}}
                                        >
                                            <Card variant="outlined" sx={{width: '100%'}}>
                                                <CardContent>
                                                    <Typography variant="body2">{task.title}</Typography>
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
