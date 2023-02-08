import {MutationAddClientArgs} from "@/gql/graphql";
import {ADD_CLIENT} from "@/graphql/mutations/client-mutations";
import {GET_CLIENTS} from "@/graphql/queries/clients-queries";
import {useMutation} from "@apollo/client";
import {Form, Input, Modal, ModalProps} from "antd";
import React from "react";

type Props = ModalProps & {
  onClose: () => void;
};

export default function ClientsModal({...props}: Props) {
  const [addClient] = useMutation(ADD_CLIENT, {
    refetchQueries: [{query: GET_CLIENTS}],
  });
  const [form] = Form.useForm();

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClose?.();
    form.resetFields();
  };

  const onFinish = (values: MutationAddClientArgs) => {
    addClient({variables: values});
    props.onClose();
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    form.validateFields().then(values => {
      form.submit();
    });
  };

  return (
    <Modal
      title="Basic Modal"
      {...props}
      okButtonProps={
        {
          // disabled: form.validateFields,
        }
      }
      onOk={onSubmit}
      onCancel={onClose}
    >
      <Form form={form} name="add-client" onFinish={onFinish}>
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
        <Form.Item name="phone" label="Phone" rules={[{required: true}]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
