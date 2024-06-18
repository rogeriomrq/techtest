import * as Components from '@/components';
import {recuperar} from "@/hooks/useRequest.tsx";
import {useCallback, useEffect, useState} from "react";
import {api} from "@/services/api.ts";
import {DefaultTable} from "@/components/Tabela";

interface Payment {
  name: string;
  email: string;
  governmentId: string;
  debtAmount: number;
  debtDueDate: string;
  debtId: number;
}

export default function ListPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFile, setSelectedFile] = useState<File>();
  const [loadingUpload, setLoadingUpload] = useState(false);

  const handleFileChange = (files: any) => {
    setSelectedFile(files[0]);
  };

  const paginate = useCallback((page: number) => {
    recuperar('payments?page='+page)
    .then(response => {
      setPayments(response.data);
      setCurrentPage(response.current_page);
      setTotalPages(response.last_page);
    }).catch(() => {
        console.log('Desculpe, ocorreu um erro ao recuperar os dados.');
      });
  },[]);

  const handleUploadFile = () => {
    if (!selectedFile) {
      console.error('Nenhum arquivo selecionado para upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    setLoadingUpload(true);

    api.post('upload/payments', formData, config)
      .then(() => {
        paginate(1);
        alert('upload feito com sucesso');
        setLoadingUpload(false);
      })
      .catch(error => {
        console.error('Erro ao fazer upload do arquivo:', error);
        setLoadingUpload(false);
        alert('Erro ao fazer upload do arquivo.');
      });
  }

  useEffect(() => {
      paginate(currentPage);
  }, [currentPage, paginate]);

  let listCollumn = [
    {name: 'name', label: 'Nome'},
    {name: 'email', label: 'E-mail'},
    {name: 'governmentId', label: 'Government Id'},
    {name: 'debtAmount', label: 'Valor da dívida', prefix: 'R$ '},
    {name: 'debtDueDate', label: 'Data de vencimento da dívida'},
    {name: 'debtId', label: 'Id dívida'},
  ];

  return (
    <>
      <div className="p-6 flex flex-col gap-4 bg-white shadow-md rounded-lg">
        <Components.FileUploader
          file={selectedFile}
          handleFile={handleFileChange}
          handleUpload={handleUploadFile}
          loadingUpload={loadingUpload}
        />
        <DefaultTable
          titulo={'Lista de débitos'}
          data={payments ?? []}
          columns={listCollumn}
          pagination={{
            currentPage: currentPage,
            totalPages: totalPages,
            onPageChange: paginate
          }}
        />
      </div>
    </>
  );
}
