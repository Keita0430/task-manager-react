import React, {useEffect, useState} from 'react';
import {GroupedTasks, Task, TaskStatus, TaskStatusType} from '../types/task';
import {Typography, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import TaskLane from "../components/TaskLane";
import axios from "axios";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<{ tasks: Task[] }>('http://localhost:3000/api/v1/tasks')
            .then((response) => setTasks(response.data.tasks))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    useEffect(() => {
        const newGroupedTasks: GroupedTasks = tasks.reduce((acc: GroupedTasks, task: Task) => {
            if (!acc[task.status]) {
                acc[task.status] = [];
            }
            acc[task.status].push(task);
            return acc;
        }, {});
        setGroupedTasks(newGroupedTasks);
    }, [tasks]);

    const handleOnDragEnd = (result: DropResult) => {
        const {destination, source} = result;
        if (!destination) return; // ドロップ先がない場合は何もしない

        const sourceStatus = source.droppableId; // 移動元ステータス
        const destinationStatus = destination.droppableId; // 移動先ステータス

        // タスクが同じレーン内で移動する場合
        if (sourceStatus === destinationStatus) {
            const tasksBeforeMoved = Array.from(groupedTasks[sourceStatus]);

            const [movedTask] = tasksBeforeMoved.splice(source.index, 1);

            const tasksAfterMoved = [
                ...tasksBeforeMoved.slice(0, destination.index),
                movedTask,
                ...tasksBeforeMoved.slice(destination.index)
            ];

            const updatedGroupedTasks = {
                ...groupedTasks,
                [sourceStatus]: tasksAfterMoved,
            };
            setGroupedTasks(updatedGroupedTasks);
        } else {
            // タスクがレーン間で移動する場合
            const sourceTasks = Array.from(groupedTasks[sourceStatus]);
            const destinationTasks = Array.from(groupedTasks[destinationStatus] || []);

            const [movedTask] = sourceTasks.splice(source.index, 1);
            movedTask.status = destinationStatus as TaskStatusType;
            destinationTasks.splice(destination.index, 0, movedTask);

            const updatedGroupedTasks = {
                ...groupedTasks,
                [sourceStatus]: sourceTasks,
                [destinationStatus]: destinationTasks,
            };

            const updatedTasks = Object.values(updatedGroupedTasks).flat() as Task[];
            setTasks(updatedTasks);
        }
    };

    const getTitle = (status: TaskStatusType) => {
        switch (status) {
            case TaskStatus.TODO:
                return 'ToDo';
            case TaskStatus.IN_PROGRESS:
                return 'In Progress';
            case TaskStatus.DONE:
                return 'Done';
            case TaskStatus.PENDING:
                return 'Pending';
        }
    }

    return (
        <div style={{height: '100vh', display: 'flex', flexDirection: 'column'}}>
            <Typography variant="h4" gutterBottom>
                タスク一覧
            </Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/tasks/new')}
                style={{marginBottom: '16px', alignSelf: 'flex-start'}}
            >
                タスク作成
            </Button>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div style={{display: 'flex', gap: '5px', height: '85vh'}}>
                    {Object.values(TaskStatus).map((status) => (
                        <TaskLane
                            key={status}
                            title={getTitle(status as TaskStatusType)}
                            tasks={groupedTasks[status] || []}
                            status={status as TaskStatusType}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskList;
