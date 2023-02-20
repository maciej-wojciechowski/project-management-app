import {Layout} from "antd";
import Head from "next/head";
import Link from "next/link";
import React, {PropsWithChildren} from "react";

const MainLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <>
      <Head>
        <title>Project management</title>
        <meta name="description" content="Project management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="h-[100vh] overflow-hidden">
        <Layout.Header className="!text-white">
          <Link href={"/"}>
            <span>Management App</span>
          </Link>
        </Layout.Header>
        <Layout.Content className="h-[calc(100vh-65px)] overflow-scroll flex flex-col w-screen h-screen py-6 px-12">
          {children}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default MainLayout;
