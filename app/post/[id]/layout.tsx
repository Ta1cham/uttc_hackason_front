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
import { useUser } from '../../context/Usercontext';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
    position: "relative",
    borderRadius: 10,
}))

const StyledListItemText = styled(ListItemText)({
    writingMode: 'horizontal-tb',
    textOrientation: 'mixed', 
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis', 
});

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
    const userContext = useContext(useUser());
    const router = useRouter();
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
            width: "350px", // サイドバーの幅
            backgroundColor: "#f5f5f5", // 背景色
            boxShadow: "none",
            padding: "10px 10px 10px 50px", // 内側余白
            height: "100vh",
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
                }}}
                onClick={() => {router.push('/home')}}
                >
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
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    '&:hover': {
                        backgroundColor: '#f0f0f0',
                    },
                    marginTop: 'auto',
                    marginBottom: 1,
                    cursor: 'pointer',
                    width: '100%',
                    }}
                    onClick={handleIconClick}
                >
                    <ListItemAvatar>
                        <Avatar alt="User Icon" src="/default.png"/>
                    </ListItemAvatar>
                        <StyledListItemText
                            // TextOverflowがうまくいっていないので時間あれば修正
                            primary={userContext.user.name}
                            secondary={'@' + userContext.user.id.slice(0, 15) + '...'}
                        />
                    <ListItemIcon
                        sx={{
                        display: 'flex',
                        justifyContent: 'flex-end', // 右端に寄せる
                        minWidth: 'unset', // デフォルトの幅制限を解除
                        }}
                    >
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
                padding: "0px", // 内側余白
                overflowY: "auto", // コンテンツが多い場合にスクロール可能にする
            }}
        >
            {children}
        </main>
        </div>
  );
}