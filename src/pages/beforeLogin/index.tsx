import Layout from "@/components/Layout/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const index = () => {
    const {status} = useSession();
    const router = useRouter();

    useEffect(()=>{
        (async () => {
            if(status === 'authenticated'){
                await router.push('/afterLogin');
            }
        })();
    }, [status]);
    return(
        <Layout>
            <h1>beforeLogin</h1>

            <div>
                <h2>Interesting content about fitness</h2>
            </div>
        </Layout>
    );
}

export default index;