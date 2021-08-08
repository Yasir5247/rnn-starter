import { gql } from '@apollo/client';

export const GET_VIOLATIONS = gql`
  query GetViolations {
    getViolations {
      id
      name
    }
  }
`;
