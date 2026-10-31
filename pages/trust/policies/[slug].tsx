import { GetStaticPaths, GetStaticProps } from 'next';
import PolicyPage from '../../../views/PolicyPage';
import { parseAllPolicies, buildReverseIndex } from '../../../lib/policyParser';
import { allSlugs, slugToDocNumber } from '../../../constants/policies/slugs';
import { PolicyData } from '../../../lib/policyTypes';

interface PolicyRouteProps {
  policy: PolicyData;
  allPolicies: PolicyData[];
  reverseIndex: Record<number, number[]>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allSlugs.map((slug) => ({
    params: { slug },
  }));

  return {
    paths,
    // All supported policy routes are generated for static hosting.
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PolicyRouteProps> = async ({ params }) => {
  const slug = params?.slug as string;

  // Doc 34 is the Trust Center landing page — redirect there
  if (slug === '34-trust-center-landing-page') {
    return {
      redirect: {
        destination: '/trust',
        permanent: true,
      },
    };
  }

  const allPolicies = parseAllPolicies();
  const reverseIndex = buildReverseIndex(allPolicies);
  const policy = allPolicies.find((p) => p.id === slug);

  if (!policy) {
    return { notFound: true };
  }

  return {
    props: {
      policy,
      allPolicies,
      reverseIndex,
    },
  };
};

export default function PolicyRoute({ policy, allPolicies, reverseIndex }: PolicyRouteProps) {
  return (
    <>
      
      <PolicyPage policy={policy} allPolicies={allPolicies} reverseIndex={reverseIndex} />
    </>
  );
}
