import {gql} from "@apollo/client";
import {Button, Table} from "antd";
import client from "apollo-client";
import React from "react";
import {PropertyAssignment} from "typescript";

type Props = {
  clients: [Record<string, unknown>];
};

const Clients = ({clients}: Props) => {
  if (!clients) {
    return null;
  }
  const dataSource = clients.map(client => ({
    key: client.id,
    name: client.name,
    phone: client.phone,
    email: client.email,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];
  console.log(clients);
  return (
    <div>
      Clients
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Clients;
