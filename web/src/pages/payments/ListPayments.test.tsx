import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import ListPayments from "@/pages/payments/index.tsx";
import * as useRequest from '@/hooks/useRequest';
import * as apiService from '@/services/api';

// Mocking the api and recuperar functions
jest.mock('@/hooks/useRequest.tsx');
jest.mock('@/services/api.ts');

const mockPayments = {
  data: [
    { name: 'John Doe', email: 'john@example.com', governmentId: '12345', debtAmount: 100.00, debtDueDate: '2023-01-01', debtId: 1 },
    { name: 'Jane Smith', email: 'jane@example.com', governmentId: '67890', debtAmount: 200.00, debtDueDate: '2023-02-01', debtId: 2 },
  ],
  current_page: 1,
  last_page: 2,
};

describe('ListPayments Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRequest.recuperar as jest.Mock).mockResolvedValue(mockPayments);
    (apiService.api.post as jest.Mock).mockResolvedValue({ data: {} });
  });

  test('renders without crashing and fetches data', async () => {
    render(<ListPayments />);

    expect(screen.getByText('Lista de débitos')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });
  });

  test('pagination works correctly', async () => {
    render(<ListPayments />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    // Update the mock to simulate a different page response
    (useRequest.recuperar as jest.Mock).mockResolvedValueOnce({
      data: [],
      current_page: 2,
      last_page: 2,
    });

    // Simulating the pagination button click
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(useRequest.recuperar).toHaveBeenCalledWith('payments?page=2');
    });
  });

  test('file upload works correctly', async () => {
    render(<ListPayments />);

    const file = new File(['test'], 'test.csv', { type: 'text/csv' });
    const input = screen.getByLabelText(/Upload File/i);

    fireEvent.change(input, { target: { files: [file] } });

    const inputElement = input as HTMLInputElement;
    expect(inputElement.files).not.toBeNull();
    if (inputElement.files) {
      expect(inputElement.files[0]).toStrictEqual(file);
    }

    fireEvent.click(screen.getByText('Upload'));

    await waitFor(() => {
      expect(apiService.api.post).toHaveBeenCalledWith(
        'upload/payments',
        expect.any(FormData),
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
    });
  });
});
