import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession()
  const addUser = trpc.useMutation(["user.AddUser"]);
  // const AddPersonalDetails = trpc.useMutation(["user.AddPersonalDetails"]);

  // useEffect(() => {
  //     if (session
  //         && status === 'authenticated'
  //         && session.user?.email
  //         && session.user?.image
  //         && session.user?.name
  //         ) {
  //         addUser.mutate({ 
  //             email: session?.user?.email,
  //             image: session?.user?.image,
  //             name: session?.user?.name,
  //         });
  //     }

  // }, [session, status])

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



