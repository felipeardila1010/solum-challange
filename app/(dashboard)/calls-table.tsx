'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Call } from './call';
import { SelectCall } from '@/lib/http/calls/get-calls-http';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CallsTable({
  calls,
  offset,
  totalCalls
}: {
  calls: SelectCall[];
  offset: number;
  totalCalls: number;
}) {
  console.log("bad1:", process.env.BACKEND_HOST);
  let router = useRouter();
  let callsPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calls</CardTitle>
        <CardDescription>
          Manage your calls and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Call ID</TableHead>
              <TableHead className="hidden md:table-cell">Customer Phone Number</TableHead>
              <TableHead className="hidden md:table-cell">Reviewer</TableHead>
              <TableHead className="hidden md:table-cell">Evaluation</TableHead>
              <TableHead className="hidden md:table-cell">QA Check</TableHead>
              <TableHead className="hidden md:table-cell">Call Start Time</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {calls.map((call) => (
              <Call key={call.call_id} call={call} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - callsPerPage, totalCalls) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalCalls}</strong> calls
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === callsPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + callsPerPage > totalCalls}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
