import Chat from "@/components/Chat/Chat";
import type { NextPage, NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { Session } from "next-auth/";
import Auth from "@/components/Auth/Auth";

const Home: NextPage = () => {
  const { data: session } = useSession();

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  return (
    <div className="h-screen">
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto space-y-3 text-center">
          {session?.user?.username ? <Chat /> : <Auth session={session} reloadSession={reloadSession} />}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);  

  console.log("SESSION: ", session);
  

  return {
    props: {
      session,
    },
  };
}

export default Home;
