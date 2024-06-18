import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
                      currentPage,
                      totalPages,
                      onPageChange
  } : PaginationProps
) {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const getPageNumbers = () => {
    const delta = 1; // Número de páginas antes e depois da página atual a serem mostradas
    const left = currentPage - delta;
    const right = currentPage + delta + 1;
    let pages = [];
    let last: number | null = null;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i < right)) {
        pages.push(i);
      }
    }

    return pages.reduce((acc, page) => {
      if (last) {
        if (page - last === 2) {
          acc.push(last + 1);
        } else if (page - last !== 1) {
          acc.push('...');
        }
      }
      acc.push(page);
      last = page;
      return acc;
    }, [] as (number | string)[]) ;
  };

  return (
      <ul className={cn('list-none', 'flex', 'justify-center', 'gap-2')}>
        {getPageNumbers().map((page, index) => (
          <li
            key={index}
            onClick={() => handlePageChange(Number(page))}
            className={cn(
              'px-3 py-2 rounded-md',
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-grey text-white-800',
              currentPage === page ? 'hover:bg-blue-600' : 'hover:bg-gray-400',
              'cursor-pointer'
            )}
          >
            {page === '...' ? '...' : page}
          </li>
        ))}
      </ul>
  );
}

export {Pagination};
