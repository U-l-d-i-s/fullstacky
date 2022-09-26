import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
  console.log(session);

  useEffect(() => {
    (async () => {
      if (status === "authenticated") {
        await router.push('/afterLogin');
      }
      if (status === "loading") {
        console.log('loading');
      }
      if (status === "unauthenticated") {
        await router.push('/beforeLogin');
      }
    })().catch(async () => {
      await router.push('/');
    });
  }, [status, router]);
  
  //TODO: have to sort onLogin flash
  return (
    <>
      {status === "loading" ? <h1>Loading Spinner</h1> : null}
      <p>route /</p>
    </>
  );
};

export default Home;



