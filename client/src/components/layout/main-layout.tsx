import {Layout} from "antd";
import Head from "next/head";
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
      <Layout>
        <Layout.Header className="!text-white">Management App</Layout.Header>
        <Layout.Content className="h-[calc(100vh-65px)] overflow-scroll flex flex-col w-screen h-screen py-6 px-12">
          {children}
        </Layout.Content>
      </Layout>
    </>
  );
};

export default MainLayout;
