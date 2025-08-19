import { EntitySchema } from "typeorm";
const commentSchema = new EntitySchema({
  name: "Comment",
  tableName: "comments",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    content: {
      type: "text",
      nullable: false,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
relations: {
  user: {
    type: "many-to-one",
    target: "User",
    joinColumn: true,
    onDelete: "CASCADE",
  },
  post: {
    type: "many-to-one",
    target: "Post",
    joinColumn: true,
    onDelete: "CASCADE",
  },
},
});

export default  commentSchema;
