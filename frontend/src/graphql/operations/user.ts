import { gql } from "@apollo/client";

export default {
  Quieries: {},
  Mutations: {
    createUsername: gql`
            mutation CreateUsername($username: String!) {
                createUsername(username: $username) {
                    success
                    error
                }
            }
        `,
  },
  Subscriptions: {},
};
