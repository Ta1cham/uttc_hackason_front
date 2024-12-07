"use client";
import { useCallback, useContext } from 'react';
import { fireAuth } from '../firebase';
import MakeTweetBox from './components/MakeTweet';
import TweetBox from './components/TweetBox';
import Box from '@mui/material/Box';
import useSWRInfinite from 'swr/infinite';
import Button from '@mui/material/Button';
import apiClient from '../lib/apiClients';
import { useUser } from '../context/Usercontext';

type Tweet = {
    id: string;
    uid: string;
    content: string;
    imurl?: string;
    posted_at: string;
    uname: string;
    likes: number;
    is_like: boolean;
}


export default function Home() {
    const userContext = useContext(useUser());

    const fetcher = useCallback(
        async (url: string) => {
            const res = await apiClient.get(url);
            return res.data;
        }, [],
    );

    const getKey = (pageIndex: number, previousPageData: Tweet[][] | null) => {
        if (previousPageData && !previousPageData.length) return null;
        return `/tweets?page=${pageIndex}&current_user=${userContext.user.id}`;
    }

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
                        uid={tweet.uid}
                        content={tweet.content}
                        image={tweet.imurl}
                        posted_at={tweet.posted_at}
                        uname={tweet.uname}
                        likes={tweet.likes}
                        is_like={tweet.is_like}
                    />
                ))
            )}
            <Button onClick={handleReload}>更新</Button>
            <Button onClick={() => {setSize(size + 1)}}>もっと見る</Button>
        </div>
    )
}