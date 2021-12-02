import graphql from "graphql";
import Posts from "../models/postModel";
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const Info = new GraphQLObjectType({
  name: "info",
  fields: () => ({
    id: {
      type: GraphQLString,
    },
    Name: {
      type: GraphQLString,
    },
    Ph_number: {
      type: GraphQLInt,
    },
    Gender: {
      type: GraphQLString,
    },
    Age: {
      type: GraphQLInt,
    },
  }),
});
const rootQuery = new GraphQLObjectType({
  name: "root",
  fields: {
    getData: {
      type: new GraphQLList(Info),
      async resolve() {
        const users = await Posts.findAll();
        console.log("hello");
        console.log(users);
        return users;
      },
    },
  },
});
const Mutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {
    postData: {
      type: Info,
      args: {
        id: { type: GraphQLString },
        Name: { type: GraphQLString },
        Ph_number: { type: GraphQLInt },
        Gender: { type: GraphQLString },
        Age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const jane = await Posts.create({
          id: args.id,
          Name: args.Name,
          Ph_number: args.Ph_number,
          Gender: args.Gender,
          Age: args.Age,
        });
        console.log(jane);
      },
    },
    updateData: {
      type: Info,
      args: {
        id: { type: GraphQLString },
        Name: { type: GraphQLString },
        Ph_number: { type: GraphQLInt },
        Gender: { type: GraphQLString },
        Age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        Posts.update(
          {
            Name: args.Name,
            Ph_number: args.Ph_number,
            Gender: args.Gender,
            Age: args.Age,
          },
          { where: { id: args.id } }
        )
          .then((result) => {})
          .catch((err) => {});
      },
    },
    deleteData: {
      type: Info,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        const deletedRow = await Posts.destroy({
          where: {
            id: args.id,
          },
        });
      },
    },
  },
});
module.exports = new graphql.GraphQLSchema({
  query: rootQuery,
  mutation: Mutations,
});
