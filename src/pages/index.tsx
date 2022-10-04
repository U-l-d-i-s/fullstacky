import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession()

  useEffect(()=>{
    console.log(status);
  })
  useEffect(() => {
    (async () => {
      if (status === "authenticated") {
        console.log('authenticated');
        await router.push('/afterLogin');
      }
      if (status === "loading") {
        console.log('loading');
      }
      if (status === "unauthenticated") {
        console.log('unauthenticated');
        await router.push('/beforeLogin');
      }
    })().catch(async () => {
      await router.push('/');
    });
  });
  
  //TODO: have to sort onLogin flash
  return (
    <>
      {status === "loading" ? <h1>Loading Spinner</h1> : null}
    </>
  );
};

export default Home;



