'use server';

import { deleteCallById } from '@/lib/calls-http';
import { revalidatePath } from 'next/cache';

export async function deleteCall(formData: FormData) {
  // let id = Number(formData.get('id'));
  // await deleteProductById(id);
  // revalidatePath('/');
}
