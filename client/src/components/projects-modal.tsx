import {
  MutationAddClientArgs,
  MutationAddProjectArgs,
  ProjectStatus,
} from "@/gql/graphql";
import {ADD_PROJECT} from "@/graphql/mutations/project-mutations";
import {GET_CLIENTS_IDS_FOR_SELECT} from "@/graphql/queries/clients-queries";
import {GET_PROJECTS} from "@/graphql/queries/project-queries";
import {useMutation, useQuery} from "@apollo/client";
import {Button, Form, Input, Modal, ModalProps, Select} from "antd";
import React from "react";

type Props = ModalProps & {
  onClose: () => void;
};

const projectStatusOptions = Object.entries(ProjectStatus);

const ProjectsModal = ({...props}: Props) => {
  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: [{query: GET_PROJECTS}],
  });
  const {data: clientIdsData} = useQuery(GET_CLIENTS_IDS_FOR_SELECT);
  const clientIds = clientIdsData?.clients || [];
  // const [addClient] = useMutation(ADD_CLIENT, {
  //   //saving to cache not refetching
  //   update(cache, {data}) {
  //     const clients = cache.readQuery({query: GET_CLIENTS})?.clients;
  //     const addClient = data?.addClient;

  //     if (!addClient || !clients) {
  //       return;
  //     }

  //     cache.writeQuery({
  //       query: GET_CLIENTS,
  //       data: {clients: [...clients, addClient]},
  //     });
  //   },
  // });
  const [form] = Form.useForm();

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClose?.();
    form.resetFields();
  };

  const onFinish = (values: MutationAddProjectArgs) => {
    addProject({variables: {...values, status: values.status ?? null}});
    props.onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Add project client"
      {...props}
      onCancel={onClose}
      footer={null}
    >
      <Form
        className="flex flex-col mt-5 [&_.ant-form-item-label]:w-24 [&_.ant-form-item-label]:text-right"
        form={form}
        name="add-project"
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Name" rules={[{required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{required: true}]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{required: true}]}>
          <Select>
            {projectStatusOptions.map(([statusName, statusVal]) => (
              <Select.Option value={statusVal}>{statusName}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="clientId" label="Client" rules={[{required: true}]}>
          <Select>
            {clientIds?.map(client => (
              <Select.Option value={client.id}>{client.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Button className="text-black ml-auto" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default ProjectsModal;
