import Head from "next/head";
import {Inter} from "@next/font/google";

import Clients from "@/components/clients";
import Projects from "@/components/projects";
import {Divider} from "antd";

const inter = Inter({subsets: ["latin"]});

export default function Home({clients}: any) {
  return (
    <>
      <Projects />
      <Divider />
      <Clients />
    </>
  );
}

export async function getServerSideProps() {
  // for build time only fetch - getStaticProps
  // const {data} = await client.query({
  //   query: GET_CLIENTS,
  // });

  return {
    props: {},
  };
}
