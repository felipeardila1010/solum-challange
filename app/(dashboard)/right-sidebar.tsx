import { ReactNode } from 'react';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function RightSidebar({ isOpen, onClose, children }: RightSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50">
      <div className="p-4 flex justify-between items-center border-b">
        <h2 className="text-lg font-medium">Edit Call</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
          Close
        </button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}