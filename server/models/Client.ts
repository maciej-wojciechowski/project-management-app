// const mongoose = require("mongoose");
import mongoose from "mongoose";
import {
  ClientDocument,
  ClientModel,
  ClientSchema,
} from "../types/mongoose-types";

const ClientSchema: ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const ClientModel = mongoose.model<ClientDocument, ClientModel>(
  "Client",
  ClientSchema
);

export default ClientModel;
