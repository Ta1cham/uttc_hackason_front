import Image from "next/image";
import RegisterCard from "./TopCard";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Typography variant="h1" component="h1" className="text-center sm:text-left" sx={{fontSize: 20, fontWeight: 'bold'}}>
          登録/ログイン
        </Typography>
        <RegisterCard />
      </main>
    </div>
  );
}

export default Home;