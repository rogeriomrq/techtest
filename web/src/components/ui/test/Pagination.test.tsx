import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import {Pagination} from "@/components";

describe('Pagination Component', () => {
  const onPageChange = jest.fn();

  const setup = (currentPage: number, totalPages: number) => {
    return render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    );
  };

 it('renders pagination buttons correctly', () => {
    setup(1, 10);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();

    // Exemplo de interação com um botão de página
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should call onPageChange with correct page number when a page is clicked', () => {
    setup(1, 10);
    const page2 = screen.getByText('2');
    fireEvent.click(page2);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('should render ellipsis correctly for large number of pages', () => {
    setup(5, 20);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getAllByText('...')).toHaveLength(2);
    expect(screen.getByText('20')).toBeInTheDocument();
  });

  it('should highlight the current page', () => {
    setup(5, 10);
    const currentPage = screen.getByText('5');
    expect(currentPage).toHaveClass('bg-blue-500');
  });
});
