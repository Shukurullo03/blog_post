import { EntitySchema } from "typeorm";

const postSchema = new EntitySchema({
  name: "Post",
  tableName: "posts",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      nullable: false,
    },
    content: {
      type: "text",
    },
        likes: {
      type: "int",
      default: 0,
    },
    views: {
      type: "int",
      default: 0,
    },
    createdAt: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
relations: {
  user: {
    target: "User",
    type: "many-to-one",
    joinColumn: {
      name: "userId",
    },
    nullable: false,
    onDelete: "CASCADE", 
  },
  comments: {
    target: "Comment",
    type: "one-to-many",
    inverseSide: "post",
  },
},
});

export default postSchema;
