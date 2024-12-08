"use client";
import { useCallback, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MakeTweetBox from '../components/MakeTweet';
import TweetBox from '../components/TweetBox';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import useSWRInfinite from 'swr/infinite';
import ButtonBase from '@mui/material/ButtonBase';
import apiClient from '../lib/apiClients';
import { useUser } from '../context/Usercontext';
import CachedIcon from '@mui/icons-material/Cached';
import { Typography } from '@mui/material';

type Tweet = {
    id: string;
    uid: string;
    content: string;
    imurl?: string;
    posted_at: string;
    uname: string;
    likes: number;
    is_like: boolean;
    reps: number;
    uimage: string;
    note: string;
}


export default function Home() {
    const userContext = useContext(useUser());

    const fetcher = useCallback(
        async (url: string) => {
            const res = await apiClient.get(url);
            console.log("url: " + url);
            console.log(res.data);
            return res.data;
        }, [],
    );

    const getKey = (pageIndex: number, previousPageData: Tweet[][] | null) => {
        if (previousPageData && previousPageData.length === 0) return null;
        return `/tweets?page=${pageIndex}&current_user=${userContext.user.id}`;
    }

    const { data, size, setSize, mutate, isValidating } = useSWRInfinite(getKey, fetcher, {
        revalidateOnReconnect: false,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateFirstPage: false,
    });

    const limit = 10
    const isEmpty = !data || data[0]?.length === 0 || !data?.[0]
    const isReachingEnd = isEmpty || (data && data?.[data?.length - 1]?.length < limit)

    const { ref, inView: isScrollEnd } = useInView()

    useEffect(() => {
        if (isScrollEnd && !isValidating && !isReachingEnd) {
            setSize((prevSize) => prevSize + 1);
        }
    }, [isScrollEnd, isValidating, isReachingEnd, setSize]);

    const handleReload = useCallback(() => {
        mutate();
    }, [mutate]);

    const flattenedData = data?.flat().filter((item) => item !== null) || [];

    return (
        <div className="p-0">
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "600px",
                height: "50px", 
                borderBottom: "1px solid"
                }}>For You</Box>
            <MakeTweetBox onPostSuccess={handleReload} />
            <ButtonBase sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "50px", 
                    width: "600px",
                    color: "#1da1f2",
                    backgroundColor: "#f5f8fa",
                }}
                onClick={handleReload}
            >
                <CachedIcon />
                <Typography>Reload...</Typography>
            </ButtonBase>
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
                        reps={tweet.reps}
                        userimage={tweet.uimage}
                        note={tweet.note}
                    />
                ))
            )}
            {<div ref={ref} aria-hidden='true' />}
            {isValidating && <CircularProgress />}
            {/* <Button onClick={() => {setSize(size + 1)}}>もっと見る</Button> */}
        </div>
    )
}