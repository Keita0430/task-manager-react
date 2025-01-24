import React from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {TaskStatusType} from "../types/task";

const TaskOptionsMenu = ({onDelete, taskId, status}: {
    onDelete: (taskId: number, status: TaskStatusType) => void;
    taskId: number;
    status: TaskStatusType;
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDeleteClick = () => {
        onDelete(taskId, status);
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
            </Menu>
        </div>
    );
};

export default TaskOptionsMenu;
