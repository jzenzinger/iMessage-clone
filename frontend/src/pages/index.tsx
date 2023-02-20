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
    <div className="h-screen bg-gradient-to-br from-sky-50 to-gray-200">
      {session?.user?.username ? (
        <Chat />
      ) : (
        <Auth session={session} reloadSession={reloadSession} />
      )}
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default Home;
