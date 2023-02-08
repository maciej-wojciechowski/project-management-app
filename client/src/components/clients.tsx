import {Button, Modal, Table} from "antd";
import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_CLIENT} from "@/graphql/mutations/client-mutations";
import {ColumnsType} from "antd/es/table";
import {GET_CLIENTS} from "@/graphql/queries/clients-queries";
import {Client} from "@/gql/graphql";
import ClientsModal from "./clients-modal";

type Props = {};

const Clients = ({}: Props) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);
  const {data} = useQuery(GET_CLIENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const results = data?.clients;

  if (!results?.length) {
    return null;
  }

  const dataSource = results.map(client => ({
    key: client.id,
    name: client.name,
    phone: client.phone,
    email: client.email,
  }));

  const columns: ColumnsType<(typeof dataSource)[0]> = [
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
      dataIndex: "action",
      key: "action",
      render: (_, {key: clientId}) => (
        <Button
          onClick={() => {
            deleteClient({
              variables: {id: clientId},
              refetchQueries: [{query: GET_CLIENTS}],
            });
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <div>
      Clients
      <Button onClick={() => setIsModalOpen(true)}>Add Client</Button>
      <Table dataSource={dataSource} columns={columns} />
      <ClientsModal open={isModalOpen} onCancel={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Clients;
