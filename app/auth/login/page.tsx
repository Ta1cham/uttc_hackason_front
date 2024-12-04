"use client";
import Box from '@mui/material/Box';
import LoginForm from './LoginForm'
import Typography from '@mui/material/Typography';

const RegisterPage = () => {
    return (
        <div>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    width: '100%',
                }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        className="text-center sm:text-left" 
                        sx={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}
                    >
                        ログイン
                    </Typography>
                </Box>
                <LoginForm />
            </main>
        </div>
    )
}

export default RegisterPage;