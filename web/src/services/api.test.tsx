import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import axios from 'axios';
import App from "@/App.tsx";

// Mock do axios para simular as requisições HTTP
jest.mock('axios');

describe('File upload integration test', () => {
  test('Uploads a file and verifies the response', async () => {
    // Mock da resposta do backend
    const mockResponse: {
      headers: {};
      data: { message: string };
      statusText: string;
      config: {};
      status: number } =
      {
        data: { message: 'File processed successfully' },
        status: 200,
        statusText: 'OK', // Adicione statusText conforme necessário
        headers: {}, // Adicione headers conforme necessário
        config: {} // Adicione config conforme necessário
      };
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    // Renderiza o componente React que contém o FileUploader
    render(<App />);

    // Seleciona o input de arquivo
    const inputFile = screen.getByLabelText('Choose a file');

    // Simula a seleção de um arquivo
    fireEvent.change(inputFile, {
      target: { files: [new File(['file contents'], 'test-file.csv', { type: 'text/csv' })] },
    });

    // Seleciona o botão de upload
    const uploadButton = screen.getByText('Upload the file');

    // Simula o clique no botão de upload
    fireEvent.click(uploadButton);

    // Aguarda a resposta do backend (usando axios mockado)
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/upload/payments', expect.any(FormData), {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    });

    // Verifica se a mensagem de sucesso é exibida no frontend
    expect(screen.getByText('File processed successfully')).toBeInTheDocument();
  });
});
