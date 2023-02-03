// const mongoose = require("mongoose");
import mongoose from "mongoose";
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
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

const ProjectModel: ProjectModel = mongoose.model<
  ProjectDocument,
  ProjectModel
>("Project", ProjectSchema);

export default ProjectModel;
