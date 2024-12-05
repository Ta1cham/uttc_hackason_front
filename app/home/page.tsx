"use client";
import { fireAuth } from '../firebase';
import { useAuth } from "../../hooks/useAuth";
import Loading from '../lib/Loading';

export default function Home() {
    console.log("fortest")
    console.log(fireAuth.currentUser)

    return (
        <div>
            <h1>Home</h1>
            <p>Get started by editing <code>app/home/page.tsx</code>
            f;alkdsf;lafd;alfj;afj;aoiefj;aoejf;gaigoha;ogha;oigj;aojg
            </p>
        </div>
    )
}