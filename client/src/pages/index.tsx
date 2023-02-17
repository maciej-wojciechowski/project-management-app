import Head from "next/head";
import {Inter} from "@next/font/google";

import Clients from "@/components/clients";
import Projects from "@/components/projects";
import {Divider} from "antd";

const inter = Inter({subsets: ["latin"]});

export default function Home({clients}: any) {
  return (
    <div className="w-full lg:w-5/6 xl:w-3/4">
      <Projects />
      <Divider />
      <Clients />
    </div>
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
