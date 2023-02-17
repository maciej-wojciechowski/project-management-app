import {ProjectStatus} from "@/gql/graphql";
import {
  ADD_PROJECT,
  UPDATE_PROJECT,
} from "@/graphql/mutations/project-mutations";
import {GET_CLIENTS_IDS_FOR_SELECT} from "@/graphql/queries/clients-queries";
import {GET_PROJECTS} from "@/graphql/queries/project-queries";
import {getProjectStatusLabel} from "@/helpers/project-helpers";
import {ProjectType} from "@/pages/project/[projectId]";
import {Nullable} from "@/types/helper-types";
import {useMutation, useQuery} from "@apollo/client";
import {Button, Form, Input, Modal, ModalProps, Select} from "antd";
import {Rule, RuleObject} from "antd/es/form";
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

  const mappedFormData: ProjectFormType | null = project
    ? {
        name: project.name,
        status: project.status,
        description: project.description,
        clientId: project.client.id,
      }
    : null;

  useEffect(() => {
    form.resetFields();
    if (mappedFormData && props.open) {
      form.setFieldsValue(mappedFormData);
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
    form.resetFields();
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
      const valuesToUpdate: Nullable<ProjectFormType> = {
        description: null,
        name: null,
        status: null,
        clientId: null,
      };
      const fieldsStatuses = form.getFieldsError();
      // sending values only when changed
      Object.entries(values).forEach(([k, v]) => {
        if (
          fieldsStatuses.some(
            ({name, warnings}) => name[0] === k && warnings.length
          )
        ) {
          valuesToUpdate[k as keyof ProjectFormType] = v;
        }
      });
      updateProject({
        variables: {
          ...valuesToUpdate,
          status: valuesToUpdate.status as ProjectStatus | null,
          id: project.id,
        },
      });
    }
    props.onClose();
  };

  const customChangeRule: Rule = {
    warningOnly: true,
    validator: (rule, value) => {
      const ruleWithFiled = rule as RuleObject & {field: keyof ProjectFormType};
      if (
        !value ||
        !mappedFormData ||
        mappedFormData[ruleWithFiled.field] === value
      ) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Changed"));
    },
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
          rules={[
            {
              required: type === "add",
            },
            customChangeRule,
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: type === "add",
            },
            customChangeRule,
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: type === "add",
            },
            customChangeRule,
          ]}
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
          rules={[
            {
              required: type === "add",
            },
            customChangeRule,
          ]}
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
