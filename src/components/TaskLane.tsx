import React, {useState} from 'react';
import {Task, TaskStatusType} from '../types/task';
import {List, ListItem, Typography, Paper} from '@mui/material';
import {Droppable, Draggable} from 'react-beautiful-dnd';
import TaskDetailModal from './TaskDetailModal';
import TaskCard from './TaskCard';

const TaskLane = ({title, tasks, status, onDelete}: {
    title: string;
    tasks: Task[];
    status: TaskStatusType;
    onDelete: (taskId: number, status: TaskStatusType) => void;
}) => {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const openTaskDetailModal = (task: Task) => {
        setSelectedTask(task);
    };

    const closeTaskDetailModal = () => {
        setSelectedTask(null);
    };

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
                                            <TaskCard task={task} openTaskDetailModal={openTaskDetailModal} onDelete={onDelete}/>
                                        </ListItem>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    </div>
                )}
            </Droppable>

            {/* タスク詳細モーダル */}
            <TaskDetailModal selectedTask={selectedTask} closeTaskDetailModal={closeTaskDetailModal}/>
        </Paper>
    );
};

export default TaskLane;
