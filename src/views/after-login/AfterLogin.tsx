import { useUserAccount } from "@/utils/hooks/useUserAccount/useUserAcciunt";
import { trpc } from "@/utils/trpc";
import { user } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const AfterLogin = () => {
    const { data: session, status } = useSession();

    return (
        <div>
            Time untill you next Workout: 
        </div>
    );
};

export default AfterLogin;