import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import ContractViewPage from '@/features/contracts/components/contract-view-page';

type PageProps = { params: Promise<{ contractId: string }> };

export const metadata = {
  title: 'Dashboard : Contract View'
};

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <ContractViewPage contractId={params.contractId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
