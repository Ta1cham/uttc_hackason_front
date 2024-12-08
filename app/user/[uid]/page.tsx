"use client";
import { useCallback, useEffect, useState, useContext, use } from 'react';
import MakeTweetBox from '../../components/MakeTweet';
import apiClient from '../../lib/apiClients';
import { useUser } from '../../context/Usercontext';
import TweetBox from '@/app/components/TweetBox';
import { Avatar, Button, Divider, IconButton, Modal, TextField, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import useSWRInfinite from 'swr/infinite';
import CircularProgress from '@mui/material/CircularProgress';
import style from 'styled-jsx/style';
import { handleWebpackExternalForEdgeRuntime } from 'next/dist/build/webpack/plugins/middleware-plugin';

const styles = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'top',
        width: 600,
        height: 600,
        bgcolor: 'background.paper',
        borderRadius: 6,
        boxShadow: 24,
        p: 2,
    };

type User = {
    id: string;
    name: string;
    bio: string;
    image: string;
}

const UserPage = ({ params }: {params: Promise<{ uid: string }>}) => {
    const [user, setUser] = useState<User | null>(null);
    const uid = use(params).uid; // URLのidパラメータを取得
    const userContext = useContext(useUser());
    const router = useRouter();
    const [previewImage, setPreviewImage] = useState<string>("");
    const [uname, setUname] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [error, setError] = useState<string>("");

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getUser = async () => {
        try {
            const response = await apiClient.get(`/user?id=${uid}`);
            if (response.status === 200) {
                if (uid === userContext.user.id) {
                    userContext.setUser({id: response.data.id, name: response.data.name, image: response.data.image});
                }
                setUser(response.data);
            } else {
                throw new Error("ツイート情報の取得に失敗しました");
            }
        } catch (error: any) {
            console.error(error);
        }
    };
    useEffect(() => {
        getUser();
    }, [uid, userContext.user.id]);


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

    const handleProfileEdit = async () => {
        setOpen(false);

        try {
            const response = await apiClient.post('/userchange', {
                id: uid,
                name: uname || user?.name,
                bio: bio,
                image: previewImage || user?.image,
            })

            if (response.status === 200) {
                getUser();
            } else {
                throw new Error('ユーザー情報の更新に失敗しました')
            }
        } catch (error: any) {
            console.log(error)
        }
    }
    return (
        <div className="p-0">
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                alignItems: "center",
                paddingTop: 2,
            }}>
                <IconButton onClick={() => {router.back()}}><ArrowBack/></IconButton>
            </Box>
            <Box sx={{
                margin: 4,
            }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <Avatar sx={{ width: 120, height: 120 }} src={user?.image || "/default.png"} />
            {
                userContext.user.id === uid &&
                <Button
                    sx={{
                        marginLeft: 'auto',
                        marginTop: 'auto',
                        borderRadius: '25px',
                        width: '160px',
                        height: '50px',
                        backgroundColor: '#000000', // ボタンの背景色
                        color: 'white', // テキスト色
                        '&:hover': {
                        backgroundColor: '#555555', // ホバー時の背景色
                        },
                    }}
                    onClick={handleOpen}
                    >
                        Edit Profile
                </Button>
            }
            </Box>
            <Typography variant='h5' sx={{marginTop: 4}}>{user?.name}</Typography>
            <Typography variant='subtitle2' sx={{marginTop: 0, color: '#777777'}}>{user?.id}</Typography>
            <Typography variant='body1' sx={{marginTop: 2}}>{user?.bio}</Typography>
            </Box>
            <Divider />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={styles}>
                <Box sx={{ marginRight: 'auto', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2}}>
                    <IconButton onClick={handleClose}><ArrowBack/></IconButton>
                    <Typography variant='h6'>Edit Profile</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'top', alignItems: 'center', margin: 4}}>
                <input 
                    type="file"
                    accept="image/*"
                    style={{display: "none"}}
                    id="input-file"
                    onChange={setImage}
                />
                <label htmlFor="input-file">
                    <Avatar sx={{ width: 120, height: 120 }} src={previewImage || user?.image || "/default.png"} />
                </label>
                </Box>
                <TextField
                    id='username'
                    label='Username'
                    defaultValue={user?.name}
                    variant="filled"
                    sx = {{ width: '100%', maxWidth: 400, marginTop: 2}}
                    onChange={(e) => {
                        setError("")
                        setUname(e.target.value)
                        if (e.target.value.length > 50) {
                            setError("Usernameは 50文字以内で入力してください");
                        } else if (e.target.value.length < 1) {
                            setError("Usernameを入力してください");
                        }
                    }
                }
                />
                <TextField
                    id='bio'
                    label='Bio'
                    defaultValue={user?.bio}
                    multiline
                    rows={4}
                    variant="filled"
                    sx = {{ width: '100%', maxWidth: 400, marginTop: 2}}
                    onChange={(e) => {
                        setError("")
                        setBio(e.target.value)
                        if (e.target.value.length > 140) {
                            setError("Bioは140文字以内で入力してください");
                        }
                    }}
                />
                {
                    error && <Typography variant='caption' sx={{color: 'red'}}>{error}</Typography>
                }
                <Button
                    variant='contained'
                    color='primary'
                    disabled={error !== ""}
                    sx={{ marginRight: '40px', marginBottom: '30px', marginLeft: 'auto', marginTop: 'auto'}}
                    onClick={handleProfileEdit}
                >Save</Button>
                </Box>
            </Modal>
        </div>
    )
}

export default UserPage;