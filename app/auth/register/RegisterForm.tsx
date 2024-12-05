"use client";
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Formlabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Divider, FormControl } from '@mui/material';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fireAuth } from '../../firebase';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
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

const RegisterForm = () => {
    // ログイン情報を管理するstate
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // エラー情報を管理するstate
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    // パスワードの表示・非表示を管理するstate
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const router = useRouter();

    const validateInputs = () => {
        const emailRegex = /^[a-z\d][\w.-]*@[\w.-]+\.[a-z\d]+$/i

        let isVallid = true;

        if (!name || name.length < 1) {
            setNameError(true);
            setNameErrorMessage('名前を入力してください');
            isVallid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }
        if (!email || !email.match(emailRegex)) {
            setEmailError(true);
            setEmailErrorMessage('メールアドレスが無効です');
            isVallid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
        if (!password || password.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage('パスワードは8文字以上で入力してください');
            isVallid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isVallid;
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const isValid = validateInputs();
        if (isValid === false) {
            return;
        }
        createUserWithEmailAndPassword(fireAuth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('登録成功' + user.uid);

            // ログイン後の画面に遷移
            router.push('/home');
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === 'auth/email-already-in-use') {
                setEmailError(true);
                setEmailErrorMessage('このメールアドレスは既に登録されています');
                return;
            } else if (errorCode) {
                setNameError(true);
                setEmailError(true);
                setPasswordError(true);
                setPasswordErrorMessage('登録に失敗しました')
            }
        });
    }
    return (
        <Card variant='outlined'>
        <Box
            component={'form'}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleSubmit}
        >
            <FormControl required>
                <Formlabel htmlFor='name' sx={{color: 'black', fontWeight: 'medium'}}>User Name</Formlabel>
                <TextField
                    variant='outlined'
                    placeholder='Enter your name'
                    id='name'
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value)
                        setNameError(false)
                        setNameErrorMessage('')
                    }}
                    error={nameError}
                    helperText={nameErrorMessage}
                />
            </FormControl>
            <FormControl required>
                <Formlabel htmlFor='email' sx={{color: 'black', fontWeight: 'medium'}}>Email</Formlabel>
                <TextField
                    variant='outlined'
                    placeholder='your@email.com'
                    id='email'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value)
                        setEmailError(false)
                        setEmailErrorMessage('')
                    }}
                    error={emailError}
                    helperText={emailErrorMessage}
                />
            </FormControl>
            <FormControl required>
                <Formlabel htmlFor='password' sx={{color: 'black', fontWeight: 'medium'}}>Password</Formlabel>
                <FormHelperText style={{margin: '10px 0 10px 0'}}>8文字以上の半角英数記号</FormHelperText>
                <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                    <TextField
                        variant='outlined'
                        placeholder='••••••'
                        type={isPasswordVisible ? "text" : "password"}
                        id='password'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                            setPasswordError(false)
                            setPasswordErrorMessage('')
                        }}
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        style={{ flexGrow: 1 }}
                    />
                    <IconButton
                        onClick={() => setIsPasswordVisible((prev) => !prev)}
                        edge="end"
                        aria-label="toggle password visibility"
                        style={{ marginLeft: "8px" }}
                        >
                        {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </div>
            </FormControl>
            <Button
                type='submit'
                variant='outlined'
                sx={{color: 'white', backgroundColor: '#333333', textTransform: 'none', marginTop: '25px'}}
            >
                登録する
            </Button>
        </Box>
        <Divider textAlign='center'></Divider>
        <Box sx={{display: 'flex', justifyContent: 'center', gap: 1}}>
            <Link href='/auth/login' style={{fontSize: 12, textDecoration: 'underline'}}>ログイン</Link>
        </Box>
        </Card>
    )
}

export default RegisterForm;