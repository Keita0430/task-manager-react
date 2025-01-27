import React from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Task, TaskStatusType} from "../types/task";
import {useNavigate} from "react-router-dom";

const TaskOptionsMenu = ({onDelete, task}: {
    onDelete: (taskId: number, status: TaskStatusType) => void;
    task: Task;
}) => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        onDelete(task.id, task.status as TaskStatusType);
        handleClose();
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="task-options-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon/>
            </IconButton>
            <Menu
                id="task-options-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>アーカイブ</MenuItem>
                <MenuItem onClick={handleDeleteClick}>削除</MenuItem>
                <MenuItem onClick={() => navigate('/tasks/edit', {state: {task}})}>編集</MenuItem>
            </Menu>
        </div>
    );
};

export default TaskOptionsMenu;
