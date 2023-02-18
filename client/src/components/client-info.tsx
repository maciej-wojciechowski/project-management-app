import {GetProjectQuery} from "@/gql/graphql";
import {Card} from "antd";
import React from "react";

type Props = {
  clientData: Pick<NonNullable<GetProjectQuery["project"]>, "client">["client"];
};

const ClientInfo = ({clientData}: Props) => {
  return (
    <Card title="Client Info">
      {clientData ? (
        <>
          <p>Name: {clientData.name}</p>
          <p>Email: {clientData.email}</p>
          <p>Phone: {clientData.phone}</p>
        </>
      ) : (
        <span>No client assigned to this project</span>
      )}
    </Card>
  );
};

export default ClientInfo;
