"use client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// あとでAndroidをfaviconにする
import Android from '@mui/icons-material/Android';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import MoreHoriz from '@mui/icons-material/MoreHoriz';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { ListItemButton } from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    position: "relative",
    borderRadius: 10,
}))

// 時間が余ったら、ウィンドウサイズが小さい場合にサイドバーをアイコンのみの表示にする
export default function FolderList({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleIconClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    return (
        <div
        style={{
                display: "flex", // フレックスボックスを有効化
                height: "100vh", // ビューポート全体の高さにする
            }}>
        <aside
            style={{
            display: "flex",
            flexDirection: "column", // 子要素を縦に並べる
            width: "280px", // サイドバーの幅
            backgroundColor: "#f5f5f5", // 背景色
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)", // 影
            padding: "10px", // 内側余白
            height: "100vh", // サイドバーの高さを画面いっぱいにする
            }}
        >
            <List sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh', maxWidth: 360, backgroundColor: 'white' }}>
                <ListItem>
                    <ListItemIcon>
                        <Android sx={{fontSize: 40}}/>
                    </ListItemIcon>
                    <ListItemText primary="あとでファビコンにする"/>
                </ListItem>
                <ListItem sx={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                }}}>
                    <ListItemAvatar>
                    <Avatar>
                        <HomeIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem sx={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                }}}>
                    <ListItemAvatar>
                    <Avatar>
                        <SearchIcon />
                    </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Search" />
                </ListItem>
                <ListItem>
                <ListItemAvatar>
                <Avatar>
                    <BeachAccessIcon />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Bookmark" />
                </ListItem>
                <ListItem sx={{
                    borderRadius: 10,
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                    marginTop: 'auto',
                    marginBottom: 1,
                    cursor: 'pointer',
                    }}
                    onClick={handleIconClick}
                >
                    <ListItemAvatar>
                        <Avatar alt="User Icon" src="/default.png"/>
                    </ListItemAvatar>
                    <ListItemText primary="USERNAME" secondary="userid"/>
                    <ListItemIcon sx={{marginLeft: 16}}>
                        <MoreHoriz />
                    </ListItemIcon>
                </ListItem>
                <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-start" sx={{width: 280}}>
                    <StyledPaper>
                        <List>
                            <ListItemButton component='a' href='/auth/logout'>
                                <ListItemText primary="このアカウントからログアウト" />
                            </ListItemButton>
                        </List>
                    </StyledPaper>
                </Popper>
            </List>
        </aside>

        <main
            style={{
                flex: 1, // 残りのスペースを占有
                padding: "16px", // 内側余白
                overflowY: "auto", // コンテンツが多い場合にスクロール可能にする
            }}
        >
            {children}
        </main>
        </div>
  );
}