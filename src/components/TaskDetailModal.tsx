import React from 'react';
import { Task } from '../types/task';
import {
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableRow,
    TableCell
} from '@mui/material';

const TaskDetailModal = ({ selectedTask, closeTaskDetailModal }: {
    selectedTask: Task | null,
    closeTaskDetailModal: () => void;
}) => {
    return (
        <Dialog
            open={Boolean(selectedTask)}
            onClose={closeTaskDetailModal}
            slotProps={{
                paper: { sx: { width: '600px', height: 'auto', maxWidth: '95%' } }, // 高さを自動調整し、幅をレスポンシブに
            }}>
            <DialogTitle>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{selectedTask?.title}</Typography>
            </DialogTitle>
            <DialogContent>
                <Table sx={{ width: '100%' }}>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>詳細</TableCell>
                            <TableCell>{selectedTask?.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>ステータス</TableCell>
                            <TableCell>{selectedTask?.status}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>作成日</TableCell>
                            <TableCell>
                                {selectedTask?.created_at ? new Date(selectedTask.created_at).toLocaleDateString() : '日付なし'}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>更新日</TableCell>
                            <TableCell>
                                {selectedTask?.updated_at ? new Date(selectedTask.updated_at).toLocaleDateString() : '日付なし'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
};

export default TaskDetailModal;
