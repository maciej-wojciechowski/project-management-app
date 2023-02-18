import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

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

ClientSchema.plugin(paginate);

const ClientModel = mongoose.model<
  ClientDocument,
  mongoose.PaginateModel<ClientDocument>
>("Client", ClientSchema);

export default ClientModel;
