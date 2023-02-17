import {Button, Modal, Spin, Table, Typography} from "antd";
import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_CLIENT} from "@/graphql/mutations/client-mutations";
import {ColumnsType} from "antd/es/table";
import {GET_CLIENTS} from "@/graphql/queries/clients-queries";
import ClientsModal from "./clients-modal";

type Props = {};

const Clients = ({}: Props) => {
  const [deleteClient] = useMutation(DELETE_CLIENT);
  const {data, loading} = useQuery(GET_CLIENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const results = data?.clients;

  const dataSource = results?.map(client => ({
    key: client.id,
    name: client.name,
    phone: client.phone,
    email: client.email,
  }));

  const columns: ColumnsType<NonNullable<typeof dataSource>[0]> = [
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
              // refetchQueries: [{query: GET_CLIENTS}],
              update(cache, {data}) {
                const clients = cache.readQuery({query: GET_CLIENTS})?.clients;
                const deleteClient = data?.deleteClient;

                if (!deleteClient || !clients) {
                  return;
                }

                cache.writeQuery({
                  query: GET_CLIENTS,
                  data: {
                    clients: clients.filter(client => client.id !== clientId),
                  },
                });
              },
            });
          }}
        >
          Delete
        </Button>
      ),
    },
  ];
  return (
    <div className="">
      <Typography.Title level={4}>Clients</Typography.Title>
      <Button className="mb-5 mt-2" onClick={() => setIsModalOpen(true)}>
        Add Client
      </Button>
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{pageSize: 5}}
        />
      </Spin>
      <ClientsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Clients;
