"use client";
import { createContext, useState, useEffect } from 'react';

const UserContext = createContext({ user: { id: '', name: '' }, setUser: (user: { id: string; name: string }) => {} });

import { ReactNode } from 'react';

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState({ id: '', name: '' });

    useEffect(() => {
    if (typeof window !== 'undefined') {
      // クライアントサイドのみで localStorage を使う
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
    });
    console.log("hooks setted!")
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return UserContext;
}