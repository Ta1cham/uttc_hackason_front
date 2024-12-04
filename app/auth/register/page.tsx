"use client";
import Box from '@mui/material/Box';
import RegisterForm from "./RegisterForm";
import Typography from '@mui/material/Typography';

const RegisterPage = () => {
    return (
        <div>
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    alignItems: 'center', // 水平方向の中央揃え
                    justifyContent: 'center', // 垂直方向の中央揃え
                    textAlign: 'center', // テキストの中央揃え
                    width: '100%',
                }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        className="text-center sm:text-left" 
                        sx={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}
                    >
                        新規登録
                    </Typography>
                </Box>
                <RegisterForm />
            </main>
        </div>
    )
}

export default RegisterPage;