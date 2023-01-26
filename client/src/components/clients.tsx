import {Button, Table} from "antd";
import React from "react";
import {useMutation} from "@apollo/client";
import {DELETE_CLIENT} from "@/mutations/client-mutations";
import client from "apollo-client";

type Props = {
  clients: [Record<string, unknown>];
};

const Clients = ({clients}: Props) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);
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
    {
      //   title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record: any) => (
        <Button onClick={() => console.log(record?.key)}>Delete</Button>
      ),
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
