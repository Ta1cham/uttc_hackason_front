"use client";
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import Formlabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import MailOutline from '@mui/icons-material/MailOutline';
import Divider from '@mui/material/Divider';
import { FormControl } from '@mui/material';
import { useState } from 'react';

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

export default function RegisterCard() {
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const validateInputs = () => {

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            if (nameError || emailError || passwordError) {
                event.preventDefault();
                return;
            }
            const data = new FormData(event.currentTarget);
            console.log({
                name: data.get('name'),
                email: data.get('email'),
                password: data.get('password')
            });
    }
    return (
        <Card variant='outlined'>
        <h1>会員登録</h1>
        <Box
            component={'form'}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            onSubmit={handleSubmit}
        >
            <FormControl>
                <Formlabel>User Name</Formlabel>
                <TextField
                    variant='outlined'
                    placeholder='Enter your name'
                    error={nameError}
                    helperText={nameErrorMessage}
                />
                <FormHelperText>Optional helper text</FormHelperText>
            </FormControl>
            <FormControl required>
                <Formlabel>Email</Formlabel>
                <TextField
                    variant='outlined'
                    placeholder='your@email.com'
                />
            </FormControl>
            <FormControl required>
                <Formlabel>Password</Formlabel>
                <TextField
                    variant='outlined'
                    placeholder='••••••'
                />
            </FormControl>
            <Divider textAlign='center' sx={{fontSize: 12}}>アカウントをお持ちの場合</Divider>
            <Button
                type='submit'
                variant='outlined'
                sx={{color: 'white', backgroundColor: '#0088ff', textTransform: 'none'}}
                onClick={validateInputs}
            >
                登録する
            </Button>
        </Box>
        </Card>
    )
}