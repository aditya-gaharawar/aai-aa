import { GetStaticProps } from 'next';
import TrustCenterPage from '../../views/TrustCenterPage';
import { parseAllPolicies } from '../../lib/policyParser';
import { PolicyData } from '../../lib/policyTypes';

interface TrustIndexProps {
  policies: PolicyData[];
}

export const getStaticProps: GetStaticProps<TrustIndexProps> = async () => {
  const policies = parseAllPolicies();
  return {
    props: { policies },
  };
};

export default function TrustRoute({ policies }: TrustIndexProps) {
  return (
    <>
      
      <TrustCenterPage policies={policies} />
    </>
  );
}
