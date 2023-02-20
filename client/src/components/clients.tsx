import {Button, Spin, Table, Typography} from "antd";
import React, {useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {DELETE_CLIENT} from "@/graphql/mutations/client-mutations";
import {ColumnsType} from "antd/es/table";
import {
  GET_CLIENTS,
  GET_PAGINATED_CLIENTS,
} from "@/graphql/queries/clients-queries";
import ClientsModal from "./clients-modal";

type Props = {};

const PAGE_SIZE = 5;

const Clients = ({}: Props) => {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [GET_PAGINATED_CLIENTS],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const {data, loading} = useQuery(GET_PAGINATED_CLIENTS, {
    variables: {
      page: currentPage,
      perPage: PAGE_SIZE,
    },
  });

  const mappedValues = {
    totalItems: data?.paginatedClients.pageInfo.totalItems ?? 0,
    clients: data?.paginatedClients.clients ?? [],
  };

  const dataSource = mappedValues.clients.map(client => ({
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
      className: "min-w-[150px]",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      className: "min-w-[100px]",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "min-w-[100px]",
    },
    {
      dataIndex: "action",
      key: "action",
      className: "min-w-[100px]",
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
          pagination={{
            current: currentPage,
            pageSize: PAGE_SIZE,
            total: mappedValues.totalItems,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
            },
          }}
        />
      </Spin>
      <ClientsModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Clients;
