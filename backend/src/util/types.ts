import { PrismaClient, Prisma } from "@prisma/client";
import { PubSub } from "graphql-subscriptions";
import { ISODateString } from "next-auth";
import {
  conversationPopulated,
  participantsPopulated,
} from "../graphql/resolvers/conversation";
import { Context } from "graphql-ws/lib/server";

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  pubsub: PubSub;
}
export interface Session {
  user: User;
  expires: ISODateString;
}
export interface SubscriptionContext extends Context {
  connectionParams: {
    session?: Session;
  };
}

/**
 * Users
 */

export interface User {
  id: string;
  username: string;
  email: string;
  image: string;
  name: string;
}

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

/**
 * Conversations
 */

export type ConversationPopulated = Prisma.ConversationGetPayload<{
  include: typeof conversationPopulated;
}>;

export type ParticipantPopulated = Prisma.ConversationParticipantsGetPayload<{
  include: typeof participantsPopulated;
}>;

/**
 * Messages
 */
