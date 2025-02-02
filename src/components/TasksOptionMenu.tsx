import React from "react";
import {IconButton, Menu, MenuItem} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useNavigate} from "react-router-dom";

const TasksOptionsMenu = () => {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                aria-controls="task-options-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon style={{marginTop: '16px', marginBottom: '16px'}}/>
            </IconButton>
            <Menu
                id="task-options-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={() => navigate('/tasks/new')}>タスク追加</MenuItem>
                <MenuItem onClick={() => navigate('/tasks/archived')}>アーカイブ済みタスク</MenuItem>
            </Menu>
        </div>
    );
};

export default TasksOptionsMenu;
