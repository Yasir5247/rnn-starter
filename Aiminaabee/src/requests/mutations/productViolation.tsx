import { gql } from '@apollo/client';
import { useQuery, useMutation } from '@apollo/client';

export const REPORT_PRODUCT_VIOLATIONS = gql`
  mutation ReportProductViolation($productId: Int!, $violationId: Int!) {
    reportProductViolation(productId: $productId, violationId: $violationId) {
      ok
    }
  }
`;

//------------------Custom Hooks--------------------------//

export function useReportProduct() {
  const [mutate, { data, error }] = useMutation(REPORT_PRODUCT_VIOLATIONS);
  return { mutate, data, error };
}
