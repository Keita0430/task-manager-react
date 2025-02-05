import React, {useState} from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {TextField, Button, Box} from '@mui/material';

const MarkdownEditor = ({value, onChange}: {
    value: string;
    onChange: (newValue: string) => void;
}) => {
    const [isPreview, setIsPreview] = useState(false);

    return (
        <Box sx={{padding: '8px', border: '1px solid #ddd', borderRadius: '4px'}}>
            <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => setIsPreview(!isPreview)}
            >
                {isPreview ? '編集モード' : 'プレビューモード'}
            </Button>

            {isPreview ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            ) : (
                <TextField
                    label="詳細"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    sx={{marginTop: '8px'}}
                />
            )}
        </Box>
    );
};

export default MarkdownEditor;
