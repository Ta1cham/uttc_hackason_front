import { Bookmark, FavoriteBorder } from '@mui/icons-material';
import ChatBubble from '@mui/icons-material/ChatBubble';
import Favorite from '@mui/icons-material/Favorite';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Image from 'next/image';
import { useTheme } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import apiClient from '../../lib/apiClients';
import { useState, useContext } from 'react';
import { useUser } from '../../context/Usercontext';

type LikeInfo = {
    tweet_id: string;
    uid: string;
}

const TweetBox = ({tweetid, uid, content, image, posted_at, uname, likes, is_like}: any) => {
    const [isLike, setIsLike] = useState<boolean>(is_like);
    const [likeCount, setLikeCount] = useState<number>(likes);
    const theme = useTheme();

    // 調整
    const lineheight = 24;
    const boxWidth = 500;
    const userContext = useContext(useUser());

    const handleLike = async () => {
        try {
            console.log("tweetid: " + tweetid);
            
            const info: LikeInfo = {
                tweet_id: tweetid,
                uid: userContext.user.id,
            }

            const response = await apiClient.post('/likes', info);

            if (response.status === 200) {
                setLikeCount(response.data.count_like);
                setIsLike(response.data.is_like);
            } else {
                throw new Error("いいねに失敗しました")
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    const calculateHeight = () => {
        let baseHeight = 110;
        if (image) {
            baseHeight += 300;
        }
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
            return baseHeight;
        }
        context.font = '14px Helvetica';
        const textWidth = context.measureText(content).width;
        const breakNum = (content.match(/\n/g) || []).length;

        const lines = Math.floor(textWidth / boxWidth) + breakNum + 1;
        baseHeight += lines * lineheight;
        
        return baseHeight;
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: calculateHeight() + 'px', maxWidth: 600, backgroundColor: 'white', padding: "20px 10px 5px 10px", borderTop: "0.5px solid"}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto', maxWidth: 600, backgroundColor: 'white' }}>
                <Avatar
                    sx={{marginRight: 2}}
                >
                    <Image src="/default.png" alt="User Icon" width={40} height={40} />
                </Avatar>
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto', maxWidth: 600, backgroundColor: 'white', alignItems: "top", gap: 0.5}}>
                    <Typography variant='postUserName'>
                        {uname}
                    </Typography>
                    <Typography variant='postUserId'>
                            {'@' + uid}
                    </Typography>
                    <Typography variant='postUserId'>
                        {'・' + posted_at}
                    </Typography>
                </Box>
            </Box>
            <Typography variant='postContent' sx={{ marginLeft: '56px', maxWidth: boxWidth + "px", whiteSpace: 'pre-line'}}>
                {content}
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                alignItems: 'center',
            }}>
                {image && 
                <Box sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 300,
                    height: 'auto',
                    maxHeight: 300, // 最大高さを制限
                    overflow: 'auto', // 超えた場合はスクロール
                    border: '1px solid #ccc',
                    borderRadius: 2,

                }}>
                    <Image src={image} alt="Post Image" width={500} height={300} />
                </Box>}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto', backgroundColor: 'white', marginLeft: '56px', marginTop: 'auto', gap: 6, alignItems: "center"}}>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, alignItems: "center", fontSize: "14px"}}>
                    <ChatBubble fontSize='small'/>{12}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, alignItems: "center", fontSize: "14px"}}>
                    <IconButton onClick={handleLike}>
                    {
                        isLike ? <Favorite fontSize='small' sx={{ color: "#ff0000" }}/> : <FavoriteBorder fontSize='small'/>
                    }
                    </IconButton>
                    {likeCount}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5, alignItems: "center", fontSize: "14px"}}>
                    <Bookmark fontSize='small'/>{0}
                </Box>
            </Box>
        </Box>
    )
}

export default TweetBox;