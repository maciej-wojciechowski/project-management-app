import {Client as MongooseClient} from "./mongoose-types";

export type Client = Required<Omit<MongooseClient, "_id">> & {id: string};
