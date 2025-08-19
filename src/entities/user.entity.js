import { EntitySchema } from "typeorm";

const userSchema = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    firstName: {
      type: "varchar",
      nullable: false,
    },
    lastName: {
      type: "varchar",
      nullable: false,
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {            
      type: "varchar",
      nullable: false,
    },
     role: {            
      type: "varchar",
      default: "user",  
    },
    age: {
      type: "int",
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
relations: {
  posts: {
    target: "Post",
    type: "one-to-many",
    inverseSide: "user",
  },
  comments: {
    target: "Comment",
    type: "one-to-many",
    inverseSide: "user",
  },
},

});

export default userSchema;

