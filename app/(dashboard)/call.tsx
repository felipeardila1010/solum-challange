'use client';

import { useState } from 'react';
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
import { SelectCall } from 'app/api/calls/get-calls-http';
import { RightSidebar } from './right-sidebar';
import { handleServerSubmit } from 'app/api/calls/put-call-http';

export function Call({ call }: { call: SelectCall }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleEditClick = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("call_id", call.call_id);

    try {
      const isOK = await handleServerSubmit(formData);

      if (isOK) {
        alert("Changes saved successfully!");
        setIsSidebarOpen(false); // Close the sidebar on success
      } else {
        alert(`Failed to save changes`);
      }
    } catch (error) {
      console.error("Error updating call:", error);
      alert("An error occurred while saving changes.");
    }
  };

  return (
    <>
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
              <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Right Sidebar */}
      <RightSidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar}>
        <form onSubmit={handleSubmit}>
          {/* Audio Player */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Recording</label>
            <audio controls className="mt-2 w-full">
              <source src={call.recording_url} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* QA Check */}
          <div className="mb-4">
            <label htmlFor="qaCheck" className="block text-sm font-medium text-gray-700">
              QA Check
            </label>
            <input
              type="text"
              id="qaCheck"
              name="qaCheck"
              defaultValue={call.qa_check}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Feedback QA */}
          <div className="mb-4">
            <label htmlFor="feedbackQa" className="block text-sm font-medium text-gray-700">
              Feedback QA
            </label>
            <textarea
              id="feedbackQa"
              name="feedbackQa"
              defaultValue={call.feedback_qa}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Evaluation */}
          <div className="mb-4">
            <label htmlFor="evaluation" className="block text-sm font-medium text-gray-700">
              Evaluation
            </label>
            <select
              id="evaluation"
              name="evaluation"
              defaultValue={call.evaluation}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="TRUE">TRUE</option>
              <option value="FALSE">FALSE</option>
            </select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full">
            Save Changes
          </Button>
        </form>
      </RightSidebar>
    </>
  );
}