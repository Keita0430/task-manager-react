export type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatusType;
    created_at: string;
    updated_at: string;
};

export const TaskStatus = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
    PENDING: 'pending',
} as const;

export type TaskStatusType = typeof TaskStatus[keyof typeof TaskStatus];


export type GroupedTasks = {
    [status: string]: Task[];
};
