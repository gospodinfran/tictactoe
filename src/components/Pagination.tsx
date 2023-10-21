import { SetStateAction } from 'react';

interface paginationProps {
  nPages: number;
  currentPage: number;
  setCurrentPage: React.Dispatch<SetStateAction<number>>;
}

export default function Pagination() {
  return <div></div>;
}
