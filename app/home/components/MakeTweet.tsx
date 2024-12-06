import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

import Image from 'next/image';
import LinkIcon from '@mui/icons-material/Link';
import { Button, Typography } from '@mui/material';


const MakeTweetBox = () => {
    const [content, setContent] = useState<string>("");
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value);
        if (content.length > 140) {
            
        }
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '20vh', maxWidth: 600, backgroundColor: 'white', padding: "20px 10px 10px 10px"}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto', maxWidth: 600, backgroundColor: 'white' }}>
                <Avatar
                    sx={{marginRight: 2}}
                >
                    <Image src="/default.png" alt="User Icon" width={40} height={40} />
                </Avatar>
                <TextField
                    id="outlined-multiline-static"
                    label="What's happening?"
                    multiline
                    variant='standard'
                    sx={{ width: '100%', maxWidth: 600, backgroundColor: 'white' }}
                    onChange={handleContentChange}
                />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto', maxWidth: 600, backgroundColor: 'white', marginTop: 1, alignItems: "center"}}>
                <InsertPhotoIcon sx={{margin: "0 20px 0 55px"}}/>
                <LinkIcon />
                <Typography sx={{marginLeft: 'auto'}}>{content.length}/140</Typography>
                <Button sx={{backgroundColor: "#1da1f2", color: "white", borderRadius: 50, width: "60px", marginLeft: 2, marginRight: 2}}>投稿</Button>
            </Box>
        </Box>
    )
}

export default MakeTweetBox;