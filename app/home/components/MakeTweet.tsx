import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import Cancel from '@mui/icons-material/Cancel';

import Image from 'next/image';
import LinkIcon from '@mui/icons-material/Link';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import { Button, Typography } from '@mui/material';
import { useUser } from '../../context/Usercontext';

import apiClient from '../../lib/apiClients';

type PostInfo = {
    content: string;
    uid: string;
    imurl?: string;
}

type MakeTweetBoxProps = {
    onPostSuccess: () => void;
};

const MakeTweetBox = ({onPostSuccess}: MakeTweetBoxProps) => {
    // ツイート内容
    const [content, setContent] = useState<string>("");
    // 画像プレビュー
    const [previewImage, setPreviewImage] = useState<string>("");
    // 行数
    const [lines, setLines] = useState<number>(1);
    const [wcerror, setWcerror] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const lineheight = 20;
    const boxWidth = 500;

    const userContext = useContext(useUser());

    const handlePost = async () => {
        if (content.length === 0) {
            setErrorMessage("投稿内容を入力してください");
            return;
        }
        if (content.length > 140) {
            setErrorMessage("140文字以内で入力してください");
            return;
        }

        try {
            const postInfo: PostInfo = {
                    content: content,
                    uid: userContext.user.id,
                    imurl: previewImage,
                }

            const response = await apiClient.post('/tweets', postInfo);

            if (response.status === 201) {
                onPostSuccess();
            } else {
                throw new Error("投稿に失敗しました")
            }
        } catch (error: any) {
            setErrorMessage("投稿に失敗しました");
        }

        // TextFieldを空に
        const textField = document.getElementById("post-content") as HTMLInputElement;
        textField.value = "";

        setContent("");
        setPreviewImage("");
        setLines(1);
        setErrorMessage("");
    }

    // 伸長処理は改善の余地あり
    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentContent = e.target.value;
        setContent(currentContent);
        if (currentContent.length > 140) {
            setWcerror(true);
        } else {
            setWcerror(false);
            setErrorMessage("");
        }

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) {
            return 16;
        }
        context.font = '16px Helvetica';
        const textWidth = context.measureText(currentContent).width

        // currentContent中の改行数を取得
        const breakNum = (currentContent.match(/\n/g) || []).length;

        setLines(Math.floor(textWidth / boxWidth) + breakNum + 1);
    }

    // 同じ画像を選択しても反応しない(要変更)
    const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (!file || file.length === 0) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result as string);
        }
        reader.readAsDataURL(file[0]);
    }

    const calculateHeight = () => {
        let baseHeight = 150;
        if (previewImage) {
            baseHeight += 300;
        }
        if (errorMessage) {
            baseHeight += 60;
        }
        baseHeight += lines * lineheight;
        return baseHeight;
    }
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            width: '100%', 
            height: calculateHeight() + "px",
            maxWidth: 600,
            backgroundColor: 'white', 
            padding: "20px 10px 10px 10px", 
            borderBottom: "3px solid"
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto', maxWidth: 600, backgroundColor: 'white' }}>
                <Avatar
                    sx={{marginRight: 2}}
                >
                    <Image src="/default.png" alt="User Icon" width={40} height={40} />
                </Avatar>
                <TextField
                    id="post-content"
                    label="What's happening?"
                    multiline
                    variant='standard'
                    fullWidth
                    sx={{ width: '100%', maxWidth: boxWidth + 5, backgroundColor: 'white' }}
                    onChange={handleContentChange}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: 'auto',
                maxWidth: 600,
                backgroundColor: 'white',
                marginTop: 1,
                alignItems: "center",
                justifyContent: "center",
                color: "#444444",
            }}>
            {errorMessage && (
                <Box sx={{
                    borderRadius: 2,
                    backgroundColor: '#ff9999',
                    display: 'flex',
                    flexDirection: 'row',
                    width: '80%',
                    height: '60px',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <ErrorOutline sx={{fontSize: 16}} />
                    <Box sx={{
                        padding: '10px',
                        fontSize: '14px',
                    }}>
                        {errorMessage}
                    </Box>
                </Box>
            )
            }
            </Box>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: 'auto',
                alignItems: 'center',
                marginTop: 1,
            }} >
                {previewImage && (
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
                        <IconButton onClick={() => {setPreviewImage("")}}>
                            <Cancel />
                        </IconButton>
                        <Image src={previewImage} alt="preview image" width={300} height={300}/>
                    </Box>
                    )
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', height: 'auto', maxWidth: 600, backgroundColor: 'white', marginTop: 'auto', alignItems: "center"}}>
                <input 
                    type="file"
                    accept="image/*"
                    style={{display: "none"}}
                    id="input-file"
                    onChange={setImage}
                />
                <label htmlFor="input-file">
                    <IconButton component="span" sx={{margin: "0 20px 0 55px"}}>
                        <InsertPhotoIcon />
                    </IconButton>
                </label>
                <LinkIcon />
                <Typography sx={{marginLeft: 'auto', color: wcerror?'red' : 'black'}}>{content.length}/140</Typography>
                <Button sx={{backgroundColor: "#1da1f2", color: "white", borderRadius: 50, width: "60px", marginLeft: 2, marginRight: 2}} onClick={handlePost}>投稿</Button>
            </Box>
        </Box>
    )
}

export default MakeTweetBox;