import { fakeContracts, Contract } from '@/constants/mock-api';
import { notFound } from 'next/navigation';
import ContractForm from './contract-form';

type Props = { contractId: string };

export default async function ContractViewPage({ contractId }: Props) {
  let contract: Contract | null = null;
  let pageTitle = 'Create New Contract';

  if (contractId !== 'new') {
    const data = await fakeContracts.getContractById(Number(contractId));
    contract = data.contract as Contract;
    if (!contract) {
      notFound();
    }
    pageTitle = `Edit Contract`;
  }

  return <ContractForm initialData={contract} pageTitle={pageTitle} />;
}
