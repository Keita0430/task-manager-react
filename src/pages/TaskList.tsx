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

        const originalStatus = source.droppableId; // 移動元ステータス
        const newStatus = destination.droppableId; // 移動先ステータス

        // 移動するタスクを取得
        const movedTask = groupedTasks[originalStatus].find((task) => (source.index + 1) === task.position);
        if (!movedTask) return;

        // 移動先のpositionを取得
        const newPosition = destination.index + 1

        // タスクが同じレーン内で移動する場合
        if (originalStatus === newStatus) {
            axios.patch<{ tasks: Task[] }>(`http://localhost:3000/api/v1/tasks/${movedTask.id}/status_and_position`, {
                task: {
                    status: originalStatus,
                    position: newPosition,
                },
            })
                .then((response) => {
                    setTasks(response.data.tasks)
                })
                .catch((error) => {
                    console.error('Failed to update task:', error);
                });
        } else {
            // タスクがレーン間で移動する場合
            axios.patch<{ tasks: Task[] }>(`http://localhost:3000/api/v1/tasks/${movedTask.id}/status_and_position`, {
                task: {
                    status: newStatus,
                    position: newPosition,
                },
            })
                .then((response) => {
                    setTasks(response.data.tasks)
                })
                .catch((error) => {
                    console.error('Failed to update task:', error);
                });
        }
    };

    const handleDeleteTask = (taskId: number, status: TaskStatusType) => {
        axios
            .delete<{ tasks: Task[] }>(`http://localhost:3000/api/v1/tasks/${taskId}`)
            .then((response) => {
                const updatedTasks = response.data.tasks;

                const updatedGroupedTasks = {
                    ...groupedTasks,
                    [status]: updatedTasks,
                };
                setGroupedTasks(updatedGroupedTasks);
            })
            .catch((error) => {
                alert('タスクの削除に失敗しました。詳細: ' + error);
            });
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
                onClick={() => navigate('/tasks/new', {state: {groupedTasks}})}
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
                            onDelete={handleDeleteTask}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskList;
