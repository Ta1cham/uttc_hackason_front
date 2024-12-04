"use client";
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// あとでAndroidをfaviconにする
import Android from '@mui/icons-material/Android';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';

// 時間が余ったら、ウィンドウサイズが小さい場合にサイドバーをアイコンのみの表示にする
export default function FolderList({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      style={{
            display: "flex", // フレックスボックスを有効化
            height: "100vh", // ビューポート全体の高さにする
        }}>
    <aside
        style={{
            width: "300px", // サイドバーの幅
            backgroundColor: "#f5f5f5", // 背景色
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)", // 影
            padding: "10px", // 内側余白
        }}
        >
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <ListItem>
            <ListItemAvatar>
            <Avatar>
                <Android />
            </Avatar>
            </ListItemAvatar>
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
            <ListItemText primary="HOME"/>
        </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="SEARCH" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="BOOKMARK" />
      </ListItem>
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