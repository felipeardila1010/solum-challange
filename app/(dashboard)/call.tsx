import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectCall } from '@/lib/db';
import { deleteCall } from './actions';

export function Call({ call }: { call: SelectCall }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{call.call_id}</TableCell>
      <TableCell className="hidden md:table-cell">{call.customer_phone_number}</TableCell>
      <TableCell className="hidden md:table-cell">{call.reviewer}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {call.evaluation}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{call.qa_check}</TableCell>
      <TableCell className="hidden md:table-cell">
        {new Date(call.call_start_time).toLocaleDateString("en-US")}
      </TableCell>
      <TableCell className="font-medium md:table-cell">{call.summary}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteCall}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
