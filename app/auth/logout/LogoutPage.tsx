"use client";
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { fireAuth } from '../../firebase';

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignitems: 'center', 
    flexDirection: 'column',
    alignSelf: 'center',
    padding: theme.spacing(2),
    gap: theme.spacing(2),
    margin: 'auto',
    borderRadius: 20,
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '350px',
        },
    ...theme.applyStyles('dark', {
        boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const LogoutCard = () => {
    const router = useRouter();

    const handleLogout = () => {
        console.log('ログアウトします')
        console.log(fireAuth.currentUser)
        fireAuth.signOut()
        .then(() => {
            router.push('/auth/login')
        })
        .catch((error) => {
            console.log(error)
            alert('ログアウトに失敗しました。')
        })
    }

    return (
        <Card variant='outlined'>
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2}}>
            <Image src='/logo.png' alt='logo' width='80' height='80' />
            <Typography variant='h6' sx={{fontWeight: 'bold'}}>ログアウトしますか?</Typography>
            <Typography variant='body2' sx={{textAlign: 'left'}}>いつでもログインし直すことができます。ログアウトすると再度利用するにはログインし直す必要があります。</Typography>
            <Button
                variant='contained'
                color='primary'
                onClick={handleLogout}
                sx={{
                    borderRadius: 50,
                    height: 45,
                    width: '100%',
                    marginTop: 2,
                }}
            >
                ログアウト
            </Button>
            <Button
                variant='contained'
                onClick={() => router.back()}
                sx={{
                    backgroundColor: '#000000',
                    '&:hover': {
                        backgroundColor: '#303030'
                    },
                    borderRadius: 50,
                    height: 45,
                    width: '100%',
                }}
            >
                キャンセル
            </Button>
            </Box>
        </Card>
    )
}

export default LogoutCard;