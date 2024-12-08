"use client";
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import GoogleIcon from '../../CustomIcons';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Formlabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import { Divider, FormControl } from '@mui/material';
import Link from 'next/link';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { fireAuth } from '../../firebase';
import { useUser } from '../../context/Usercontext';
import apiClient from '../../lib/apiClients';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignitems: 'center', 
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const LoginForm = () => {
    // ログイン情報を管理するstate
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // エラー情報を管理するstate
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const router = useRouter();
    const userContext = useContext(useUser());

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(fireAuth, email, password)
            const user = userCredential.user;

            // http://localhost:8000/user?id=user.id
            const response = await apiClient.get(`/user?id=${user.uid}`)

            if (response.status === 200) {
                console.log("ユーザー情報を取得しました")
                userContext.setUser({id: user.uid, name: response.data.name, image: response.data.image})
                router.push('/home')
            } else {
                console.log("ユーザー情報の取得に失敗しました")
            }
        } catch (error: any) {
            console.log(error)
            setEmailError(true)
            setPasswordError(true)
            if (error.code === 'auth/invalid-credential') {
                setPasswordErrorMessage('メールアドレスまたはパスワードが正しくありません')
            } else {
                // 詳細な分岐は後々追加
                setPasswordErrorMessage('エラーが発生しました')
            }
        }
    }
    return (
        <Card variant='outlined'>
        <Box sx={{
                display: 'flex',
                flexDirection: 'column', // 縦方向に配置
                alignItems: 'center',    // 中央揃え
                textAlign: 'center',     // テキストの中央揃え
            }}
        >
            <Avatar sx={{
                backgroundColor: 'white',
                border: '1px solid #cccccc',
                '&:hover': {
                    border: '1px solid #777777',
                },
                width: 50,
                height: 50,
                cursor: 'pointer',
            }}>
                <GoogleIcon />
            </Avatar>
            <Typography variant="caption" sx={{ marginTop: 1 }}>
                Google
            </Typography>
        </Box>
        <Divider textAlign='center'></Divider>
        <Box
            component={'form'}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleSubmit}
        >
            <FormControl required>
                <Formlabel htmlFor='email' sx={{color: 'black', fontWeight: 'medium'}}>メールアドレス</Formlabel>
                <TextField
                    variant='outlined'
                    placeholder='your@email.com'
                    id='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                />
            </FormControl>
            <FormControl required>
                <Formlabel htmlFor='password' sx={{color: 'black', fontWeight: 'medium'}}>Password</Formlabel>
                <FormHelperText style={{margin: '10px 0 10px 0'}}>8文字以上の半角英数記号</FormHelperText>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <TextField
                        variant='outlined'
                        placeholder='••••••'
                        type='password'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        style={{ flexGrow: 1 }}
                    />
                </div>
            </FormControl>
            <Button
                type='submit'
                variant='outlined'
                sx={{color: 'white', backgroundColor: '#333333', textTransform: 'none', marginTop: '25px'}}
            >
                ログイン
            </Button>
        </Box>
        <Divider textAlign='center'></Divider>
        <Box sx={{display: 'flex', justifyContent: 'center', gap: 1}}>
            <Link href='/' style={{fontSize: 12, textDecoration: 'underline'}}>会員登録はこちら</Link>
        </Box>
        </Card>
    )
}

export default LoginForm;