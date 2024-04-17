import mongoose, { Connection } from "mongoose";

const user_db: Connection = mongoose.createConnection(
  `mongodb+srv://mamajonovxayot0:Xayotbek2007@xayotbek.gau92x8.mongodb.net/users`,
);

const flower_db: Connection = mongoose.createConnection(
  `mongodb+srv://mamajonovxayot0:Xayotbek2007@xayotbek.gau92x8.mongodb.net/flower`,
);
export { user_db, flower_db };
