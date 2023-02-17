import {ProjectStatus} from "@/gql/graphql";
import {
  ADD_PROJECT,
  UPDATE_PROJECT,
} from "@/graphql/mutations/project-mutations";
import {GET_CLIENTS_IDS_FOR_SELECT} from "@/graphql/queries/clients-queries";
import {GET_PROJECTS} from "@/graphql/queries/project-queries";
import {getProjectStatusLabel} from "@/helpers/project-helpers";
import {ProjectType} from "@/pages/project/[projectId]";
import {useMutation, useQuery} from "@apollo/client";
import {Button, Form, Input, Modal, ModalProps, Select} from "antd";
import {useRouter} from "next/router";
import React, {useEffect} from "react";

type Props = ModalProps & {
  type: "add" | "update";
  project?: ProjectType;
  onClose: () => void;
};

type ProjectFormType = {
  description: string;
  name: string;
  status: string;
  clientId: string;
};

const ProjectsModal = ({type, project, ...props}: Props) => {
  const router = useRouter();
  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: [{query: GET_PROJECTS}],
  });
  const [updateProject] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => {
      router.replace(router.asPath);
    },
  });

  const [form] = Form.useForm<ProjectFormType>();

  useEffect(() => {
    if (project && props.open) {
      form.setFieldsValue({
        ...project,
        clientId: project.client.id,
      });
    }
  }, [project, props.open]);

  const {data: clientIdsData, loading: isLoadingClients} = useQuery(
    GET_CLIENTS_IDS_FOR_SELECT
  );
  const clientIds = clientIdsData?.clients || [];

  const onClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    props.onClose?.();
    if (type === "add") {
      form.resetFields();
    }
  };

  const onFinish = (values: ProjectFormType) => {
    if (type === "add") {
      addProject({
        variables: {
          ...values,
          status: (values.status as ProjectStatus) ?? null,
        },
      });
      form.resetFields();
    }
    if (type === "update" && project) {
      updateProject({
        variables: {
          ...values,
          id: project.id,
          status: values.status as ProjectStatus,
        },
      });
    }
    props.onClose();
  };

  return (
    <Modal
      title={type.toUpperCase() + " " + "PROJECT"}
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
        <Form.Item
          name="name"
          label="Name"
          rules={[{required: type === "add"}]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{required: type === "add"}]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{required: type === "add"}]}
        >
          <Select>
            {Object.values(ProjectStatus).map(status => (
              <Select.Option value={status}>
                {getProjectStatusLabel(status)}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="clientId"
          label="Client"
          rules={[{required: type === "add"}]}
        >
          <Select loading={isLoadingClients}>
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
