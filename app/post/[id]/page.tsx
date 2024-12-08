"use client";
import { useCallback, useEffect, useState, useContext, use } from 'react';
import MakeTweetBox from '../../components/MakeTweet';
import apiClient from '../../lib/apiClients';
import { useUser } from '../../context/Usercontext';
import TweetBox from '@/app/components/TweetBox';
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';
import CircularProgress from '@mui/material/CircularProgress';

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
}

const PostPage = ({ params }: {params: Promise<{ id: string }>}) => {
    const [tweet, setTweet] = useState<Tweet | null>(null); // tweetデータを保存するステート
    const id = use(params).id; // URLのidパラメータを取得
    const userContext = useContext(useUser());
    const router = useRouter();

    // 元ツイの取得
    const getParTweet = async () => {
        try {
            const response = await apiClient.get(`/tweet?id=${id}&current_user=${userContext.user.id}`);
            if (response.status === 200) {
                setTweet(response.data);
                console.log("取得")
                console.log(response.data)
            } else {
                throw new Error("ツイート情報の取得に失敗しました");
            }
        } catch (error: any) {
            console.error(error);
        }
    };
    useEffect(() => {
        getParTweet();
    }, [id, userContext.user.id]);

    // リプライの表示
    const fetcher = useCallback(
        async (url: string) => {
            const res = await apiClient.get(url);
            return res.data;
        }, [],
    );

    const getKey = (pageIndex: number, previousPageData: Tweet[][] | null) => {
        if (previousPageData && previousPageData.length === 0) return null;
        return `/tweets?page=${pageIndex}&current_user=${userContext.user.id}&pid=${id}`;
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

    if (!tweet) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-0">
            <Box>
                <IconButton onClick={() => {router.back()}}><ArrowBack/></IconButton>
            </Box>
            <TweetBox
                mode="main"
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
            />
            <MakeTweetBox mode="reply" parentId={tweet.id} onPostSuccess={handleReload} />
            {flattenedData.length > 0 && (
                flattenedData.map((tweet: Tweet) => (
                    <TweetBox
                        mode="main"
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
                    />
                ))
            )}
            {<div ref={ref} aria-hidden='true' />}
            {isValidating && <CircularProgress />}
        </div>
    );
}

export default PostPage;
