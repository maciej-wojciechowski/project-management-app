import {MutationAddClientArgs} from "@/gql/graphql";
import {ADD_CLIENT} from "@/graphql/mutations/client-mutations";
import {GET_CLIENTS} from "@/graphql/queries/clients-queries";
import {useMutation} from "@apollo/client";
import {Button, Form, Input, Modal, ModalProps} from "antd";
import React from "react";

type Props = ModalProps & {
  onClose: () => void;
};

const ClientsModal = ({...props}: Props) => {
  const [addClient] = useMutation(ADD_CLIENT, {
    //saving to cache not refetching
    update(cache, {data}) {
      const clients = cache.readQuery({query: GET_CLIENTS})?.clients;
      const addClient = data?.addClient;

      if (!addClient || !clients) {
        return;
      }

      cache.writeQuery({
        query: GET_CLIENTS,
        data: {clients: [...clients, addClient]},
      });
    },
  });
  const [form] = Form.useForm();

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClose?.();
    form.resetFields();
  };

  const onFinish = (values: MutationAddClientArgs) => {
    addClient({variables: values});
    props.onClose();
    form.resetFields();
  };

  return (
    <Modal title="Add new client" {...props} onCancel={onClose} footer={null}>
      <Form
        className="flex flex-col mt-5 [&_.ant-form-item-label]:w-16 [&_.ant-form-item-label]:text-left"
        form={form}
        name="add-client"
        onFinish={onFinish}
      >
        <Form.Item name="name" label="Name" rules={[{required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {required: true},
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[
            {required: true},
            {
              pattern: new RegExp(/^\d{9}$/),
              message: "Not a valid number",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Button className="text-black ml-auto" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </Modal>
  );
};

export default ClientsModal;
