import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';

import { GetSignedUrl, GetSignedUrlVariables } from './__generated__/GetSignedUrl';

export const GET_SIGNED_URL = gql`
  mutation GetSignedUrl($file: [FileInput]!) {
    signS3(file: $file) {
      signedRequest
      url
    }
  }
`;

//-------------cutom hooks-----------------------------//

export function useGetSignedUrl() {
  const [mutate, { data, error, loading }] = useMutation<GetSignedUrl, GetSignedUrlVariables>(
    GET_SIGNED_URL,
  );
  return { mutate, data, error, loading };
}
