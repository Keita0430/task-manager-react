import React, {useEffect, useState} from 'react';
import {GroupedTasks, Task, TaskStatus, TaskStatusType} from '../types/task';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import TaskLane from "../components/TaskLane";
import axios from "axios";
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import TasksOptionsMenu from "../components/TasksOptionMenu";

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [groupedTasks, setGroupedTasks] = useState<GroupedTasks>({});

    useEffect(() => {
        axios.get<{ tasks: Task[] }>('http://localhost:3000/api/v1/tasks')
            .then((response) => setTasks(response.data.tasks))
            .catch((error: unknown) => {
                alert('タスクの一覧の取得に失敗しました。詳細: ' + error);
            });
    }, []);

    useEffect(() => {
        const newGroupedTasks: GroupedTasks = tasks.reduce((acc: GroupedTasks, task: Task) => {
            if (!acc[task.status]) {
                acc[task.status] = [];
            }
            acc[task.status].push(task);
            return acc;
        }, {});

        // 各レーンのタスクを position 順にソート
        Object.keys(newGroupedTasks).forEach((status) => {
            newGroupedTasks[status].sort((a, b) => a.position - b.position);
        });

        setGroupedTasks(newGroupedTasks);
    }, [tasks]);

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source } = result;
        if (!destination) return; // ドロップ先がない場合は何もしない

        const sourceStatus = source.droppableId;
        const destinationStatus = destination.droppableId;

        // 移動するタスクを取得
        const movedTask = groupedTasks[sourceStatus].find((task) => (source.index + 1) === task.position);
        if (!movedTask) return;

        const newPosition = destination.index + 1;

        /*
        groupedTasks はレーンごとのタスクの並び順を管理しているため、並び替え時には tasks ではなく groupedTasks を更新する必要がある。
        tasks は API レスポンスで同期されるため、データ整合性に影響しない。
        */
        setGroupedTasks((prevGroupedTasks) => {
            const updatedGroupedTasks = { ...prevGroupedTasks };

            if (sourceStatus === destinationStatus) {
                // **タスクが同じレーン内で移動する場合**
                const tasksInLane: Task[] = [...updatedGroupedTasks[sourceStatus]];

                // タスクを元の位置から削除
                tasksInLane.splice(source.index, 1);
                // 新しい位置に挿入
                tasksInLane.splice(destination.index, 0, movedTask);

                // position を更新
                updatedGroupedTasks[sourceStatus] = tasksInLane.map((task, index) => ({
                    ...task,
                    position: index + 1,
                }));
            } else {
                // **タスクがレーン間で移動する場合**
                const sourceLane = [...updatedGroupedTasks[sourceStatus]];
                const targetLane = [...(updatedGroupedTasks[destinationStatus] || [])];

                // 移動元のレーンからタスクを削除
                const filteredSourceLane = sourceLane.filter((task) => task.id !== movedTask.id);
                // 移動元レーンのタスクの position を更新
                updatedGroupedTasks[sourceStatus] = filteredSourceLane.map((task, index) => ({
                    ...task,
                    position: index + 1,
                }));

                // 移動先レーンにタスクを追加
                targetLane.splice(destination.index, 0, { ...movedTask, status: destinationStatus as TaskStatusType });
                // 移動先レーンのタスクの position を更新
                updatedGroupedTasks[destinationStatus] = targetLane.map((task, index) => ({
                    ...task,
                    position: index + 1,
                }));
            }

            return updatedGroupedTasks;
        });

        reorderTask(movedTask.id, destinationStatus as TaskStatusType, newPosition);
    };

    const reorderTask = (taskId: number, status: TaskStatusType, position: number) => {
        axios.post<{ tasks: Task[] }>('http://localhost:3000/api/v1/tasks/reorder', {
            task: { id: taskId, status, position },
        })
            .then((response) => {
                setTasks(response.data.tasks);
            })
            .catch((error: unknown) => {
                alert('タスクの並び替えに失敗しました。詳細: ' + error);
            });
    };

    const deleteTask = (taskId: number) => {
        axios
            .delete<{ tasks: Task[] }>(`http://localhost:3000/api/v1/tasks/${taskId}`)
            .then((response) => {
                setTasks(response.data.tasks)
            })
            .catch((error) => {
                alert('タスクの削除に失敗しました。詳細: ' + error);
            });
    };

    const archiveTask = (taskId: number) => {
        axios
            .patch<{ tasks: Task[] }>(`http://localhost:3000/api/v1/tasks/${taskId}/archive`, {
                task: {
                    archived: true,
                },
            })
            .then((response) => {
                setTasks(response.data.tasks)
            })
            .catch((error) => {
                alert('タスクのアーカイブに失敗しました。詳細: ' + error);
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
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <ViewKanbanIcon style={{ color: '#666', marginTop: '24px', marginBottom: '16px'}} />
                <TasksOptionsMenu groupedTasks={groupedTasks} />
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div style={{display: 'flex', gap: '5px', flexGrow: 1, minHeight: 0, marginBottom: '16px'}}>
                    {Object.values(TaskStatus).map((status) => (
                        <TaskLane
                            key={status}
                            title={getTitle(status as TaskStatusType)}
                            tasks={groupedTasks[status] || []}
                            status={status as TaskStatusType}
                            onDelete={deleteTask}
                            onArchive={archiveTask}
                        />
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskList;
