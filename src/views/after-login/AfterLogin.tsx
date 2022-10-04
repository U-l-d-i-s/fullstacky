import { useUserAccount } from "@/utils/hooks/useUserAccount/useUserAcciunt";
import { trpc } from "@/utils/trpc";
import { user } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AfterLogin = () => {
    const { data: session, status } = useSession();
    const addUser = trpc.useMutation(["user.AddUser"]);
    // const AddPersonalDetails = trpc.useMutation(["user.AddPersonalDetails"]);

    useEffect(() => {
        if (session
            && status === 'authenticated'
            && session.user?.email
            && session.user?.image
            && session.user?.name
            ) {
            addUser.mutate({ 
                email: session?.user?.email,
                image: session?.user?.image,
                name: session?.user?.name,
            });
        }

    }, [session, status])

    useEffect(() => {
    }, []);

    return (
        <div>
            afterLogin
        </div>
    );
};

export default AfterLogin;