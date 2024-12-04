"use client";
import { useRouter } from "next/navigation";

import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import GoogleIcon from './CustomIcons';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button';
import MailOutline from '@mui/icons-material/MailOutline';
import Divider from '@mui/material/Divider';

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

const RegisterCard: React.FC = () => {
    const router = useRouter();
    return (
        <Card variant='outlined'>
        <h1>会員登録</h1>
        <Box display='flex' flexDirection='column' gap={2}>
            <Button variant='outlined' sx={{color: 'white', backgroundColor: '#00c616'}} onClick={() => router.push('/auth/register')}>
                <MailOutline/><Box sx={{ width: 8 }} />メールで登録
            </Button>
            <Button variant='outlined' sx={{color: 'black', backgroundColor: 'white', textTransform: 'none'}} onClick={() => alert("not yet implemented")}>
                <GoogleIcon/><Box sx={{ width: 8 }} />Googleで登録
            </Button>
        </Box>
        <Divider textAlign='center' sx={{fontSize: 12}}>アカウントをお持ちの場合</Divider>
        <Button variant='outlined' sx={{color: 'white', backgroundColor: '#0088ff', textTransform: 'none'}} onClick={() => router.push('/auth/login')}>
            ログイン
        </Button>
        </Card>
    )
}

export default RegisterCard;