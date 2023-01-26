import Head from "next/head";
import {Inter} from "@next/font/google";

import client from "apollo-client";
import {gql} from "@apollo/client";
import Clients from "@/components/clients";

const inter = Inter({subsets: ["latin"]});

export default function Home({clients}: any) {
  console.log(clients);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col w-screen h-screen">
        <h1 className="text-2xl text-center">Management APP Hello</h1>
        <Clients clients={clients} />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  // for build time only fetch - getStaticProps
  const {data} = await client.query({
    query: gql`
      query {
        clients {
          name
          id
          name
          phone
          email
        }
      }
    `,
  });

  return {
    props: {
      clients: data.clients,
    },
  };
}
