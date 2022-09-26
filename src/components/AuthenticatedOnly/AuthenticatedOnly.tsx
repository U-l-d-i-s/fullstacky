import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "./AuthenticatedOnly.module.css";

type AuthenticatedOnlyProps = {
    children: JSX.Element,
}
const AuthenticatedOnly = ({children}: AuthenticatedOnlyProps) => {
    const {status, data:session} = useSession();
    const router = useRouter();

    useEffect(()=> {
        (async ()=>{
            if(status === "unauthenticated" && !session){
                await router.push('/beforeLogin');
            }
        })().catch(()=>{
            throw new Error(`cant redirect to /beforeLogin`);
        });
    }, [session, status])

    if(status === "loading"){
        return(
            <div className={styles.container}>
                Loading Spinner
            </div>
        )
    }
    return children;
};

export default AuthenticatedOnly;