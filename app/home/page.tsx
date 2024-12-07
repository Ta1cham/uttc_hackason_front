"use client";
import { useCallback } from 'react';
import { fireAuth } from '../firebase';
import MakeTweetBox from './components/MakeTweet';
import TweetBox from './components/TweetBox';
import Box from '@mui/material/Box';
import useSWRInfinite from 'swr/infinite';
import Button from '@mui/material/Button';
import apiClient from '../lib/apiClients';
import { mutate } from 'swr';

type Tweet = {
    id: string;
    content: string;
    uid: string;
    imurl?: string;
    likes: number;
    posted_at: string;
    uname: string;
}

const getKey = (pageIndex: number, previousPageData: Tweet[][] | null) => {
        if (previousPageData && !previousPageData.length) return null;
        return `/tweets?page=${pageIndex}`;
    }


export default function Home() {
    console.log("fortest")
    console.log(fireAuth.currentUser)

    const fetcher = useCallback(
        async (url: string) => {
            const res = await apiClient.get(url);
            return res.data;
        }, [],
    );

    const { data, size, setSize, mutate } = useSWRInfinite(getKey, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateFirstPage: false, // 2ページ目以降を読み込むとき毎回1ページ目を再検証
    });

    const handleReload = useCallback(() => {
        mutate();
    }, [mutate]);

    const flattenedData = data?.flat().filter((item) => item !== null) || [];

    return (
        <div className="p-0">
            <Box sx={{height: "50px", borderBottom: "1px solid"}}></Box>
            <MakeTweetBox onPostSuccess={handleReload} />
            {flattenedData.length > 0 && (
                flattenedData.map((tweet: Tweet) => (
                    <TweetBox
                        key={tweet.id}
                        tweetid={tweet.id}
                        uname={tweet.uname}
                        uid={tweet.uid}
                        content={tweet.content}
                        image={tweet.imurl}
                        likes={tweet.likes}
                        posted_at={tweet.posted_at}
                    />
                ))
            )}
            <Button onClick={handleReload}>更新</Button>
            <Button onClick={() => {setSize(size + 1)}}>もっと見る</Button>
        </div>
    )
}