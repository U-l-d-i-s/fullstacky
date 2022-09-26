import { personal, user } from "@prisma/client";
import React, { createContext, useCallback, useContext, useState } from "react";

type userAccount = {
    user?: user,
    personal?: personal
};

const userAccountContext = createContext({} as ReturnType<typeof useProvideUserAccount>);

export const useUserAccount = () => useContext(userAccountContext);

const useProvideUserAccount = () => {
    const [userData, setUserData] = useState<userAccount | null>(null);

    setUserData({
        user: {
            email: 'hey',
            id: 1,
            image: 'hey',
            name: 'hey',
        },
        personal: {
            address: 'avotu',
            city: 'avotu',
            country: 'avotu',
            id: 1,
            userName: 'u-l-d-i-s',
            postal: 'postal',
        }
    });

    const refreshUserAccount = useCallback(() => {
        return console.log('refreshUser');
    }, []);

    return {
        userData,
        refreshUserAccount,
    }
};

export const ProvideUserAccount = ({ children }: { children: React.ReactNode }) => {
    const context = useProvideUserAccount();
    return (
        <userAccountContext.Provider
            value={context}
        >
            {children}
        </userAccountContext.Provider>
    );
};