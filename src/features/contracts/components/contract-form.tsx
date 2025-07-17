'use client';

import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Contract } from '@/constants/mock-api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  images: z.any().optional(),
  tenant: z.string().min(2, { message: 'Tenant name must be at least 2 characters.' }),
  start_date: z.string(),
  term: z.number(),
  sqm: z.number(),
  license_fee: z.number(),
  services_fee: z.number(),
  license_fee_increase: z.number(),
  services_fee_increase: z.number()
});

export default function ContractForm({
  initialData,
  pageTitle
}: {
  initialData: Contract | null;
  pageTitle: string;
}) {
  const defaultValues = {
    tenant: initialData?.tenant || '',
    start_date: initialData?.start_date || '',
    term: initialData?.term || 12,
    sqm: initialData?.sqm || 0,
    license_fee: initialData?.license_fee || 0,
    services_fee: initialData?.services_fee || 0,
    license_fee_increase: initialData?.license_fee_increase || 0,
    services_fee_increase: initialData?.services_fee_increase || 0
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Form submission logic would be implemented here
  }

  return (
    <Card className='mx-auto w-full'>
      <CardHeader>
        <CardTitle className='text-left text-2xl font-bold'>{pageTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='images'
              render={({ field }) => (
                <div className='space-y-6'>
                  <FormItem className='w-full'>
                    <FormLabel>Images</FormLabel>
                    <FormControl>
                      <FileUploader
                        value={field.value}
                        onValueChange={field.onChange}
                        maxFiles={4}
                        maxSize={4 * 1024 * 1024}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
              )}
            />
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='tenant'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tenant</FormLabel>
                    <FormControl>
                      <Input placeholder='Tenant name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='start_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input type='date' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='term'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Term (months)</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='sqm'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SQM</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='license_fee'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License Fee</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='services_fee'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Fee</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='license_fee_increase'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Increase License Fee (%)</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='services_fee_increase'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Increase Services Fee (%)</FormLabel>
                    <FormControl>
                      <Input type='number' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit'>Save</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
