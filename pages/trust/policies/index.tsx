import { GetStaticProps } from 'next';
import PolicyDirectoryPage from '../../../views/PolicyDirectoryPage';
import { parseAllPolicies, parseAppendixIndex } from '../../../lib/policyParser';
import { PolicyData } from '../../../lib/policyTypes';

interface PoliciesIndexProps {
  policies: PolicyData[];
  appendixIndex: Array<{
    policy: string;
    riskLevels: string;
    keyCrossRefs: string;
    isNew: boolean;
  }>;
}

export const getStaticProps: GetStaticProps<PoliciesIndexProps> = async () => {
  const policies = parseAllPolicies();
  const appendixIndex = parseAppendixIndex();
  return {
    props: { policies, appendixIndex },
  };
};

export default function PoliciesRoute({ policies, appendixIndex }: PoliciesIndexProps) {
  return (
    <>
      
      <PolicyDirectoryPage policies={policies} appendixIndex={appendixIndex} />
    </>
  );
}
