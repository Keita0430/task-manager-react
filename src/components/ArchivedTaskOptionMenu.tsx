import React from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {Task} from "../types/task";

const ArchivedTaskOptionsMenu = ({task, unarchiveTask}: {
    task: Task;
    unarchiveTask: (taskId: number) => void;
}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUnArchiveClick = () => {
        unarchiveTask(task.id);
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
                <MenuItem onClick={handleUnArchiveClick}>復元する</MenuItem>
            </Menu>
        </div>
    );
};

export default ArchivedTaskOptionsMenu;
