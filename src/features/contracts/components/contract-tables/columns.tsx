'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Contract } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Contract>[] = [
  {
    accessorKey: 'tenant',
    header: ({ column }: { column: Column<Contract, unknown> }) => (
      <DataTableColumnHeader column={column} title='Tenant' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Contract['tenant']>()}</div>,
    meta: {
      label: 'Tenant',
      placeholder: 'Search tenant...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true
  },
  {
    accessorKey: 'start_date',
    header: 'Start Date'
  },
  {
    accessorKey: 'term',
    header: 'Term (mths)'
  },
  {
    accessorKey: 'sqm',
    header: 'SQM'
  },
  {
    accessorKey: 'license_fee',
    header: 'License Fee'
  },
  {
    accessorKey: 'services_fee',
    header: 'Services Fee'
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
