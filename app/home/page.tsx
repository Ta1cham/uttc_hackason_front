"use client";
import { fireAuth } from '../firebase';
import MakeTweetBox from './components/MakeTweet';
import Box from '@mui/material/Box';

export default function Home() {
    console.log("fortest")
    console.log(fireAuth.currentUser)

    return (
        <div className="p-0">
            <Box sx={{height: "50px", borderBottom: "1px solid"}}></Box>
            <MakeTweetBox />
            <div className="p-4">ほげほげ</div>
        </div>
    )
}