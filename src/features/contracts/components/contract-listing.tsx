import { Contract } from '@/constants/data';
import { fakeContracts } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { ContractTable } from './contract-tables';
import { columns } from './contract-tables/columns';

export default async function ContractListingPage() {
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search })
  };

  const data = await fakeContracts.getContracts(filters);
  const total = data.total_contracts;
  const contracts: Contract[] = data.contracts;

  return (
    <ContractTable data={contracts} totalItems={total} columns={columns} />
  );
}
