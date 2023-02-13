import userResolvers from "./user";
import merge from 'lodash.merge';

const resolvers = merge({}, userResolvers); // later will add conversation, chat, etc. resolvers

export default resolvers;