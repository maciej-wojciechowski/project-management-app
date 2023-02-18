// const mongoose = require("mongoose");
import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

import {
  ProjectDocument,
  ProjectModel,
  ProjectSchema,
} from "../types/mongoose-types";

const ProjectSchema: ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["new", "progress", "completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

ProjectSchema.plugin(paginate);

const ProjectModel = mongoose.model<
  ProjectDocument,
  mongoose.PaginateModel<ProjectDocument>
>("Project", ProjectSchema);

export default ProjectModel;
