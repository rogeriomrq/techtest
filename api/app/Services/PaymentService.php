<?php

namespace App\Services;

use App\Interfaces\Repositories\PaymentRepositoryInterface;
use App\Interfaces\Services\PaymentServiceInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PaymentService implements PaymentServiceInterface
{
    protected $paymentRepository;
    private const SIZEBATCH = 1000;
    private const COLUMNS = [
        'name',
        'governmentId',
        'email',
        'debtAmount',
        'debtDueDate',
        'debtId',
    ];

    public function __construct(PaymentRepositoryInterface $paymentRepository)
    {
        $this->paymentRepository = $paymentRepository;
    }
    public function processFile($file)
    {
        $data = [];
        $first = false;
        $count = 1;

        try {
            DB::beginTransaction();

            $filePath = $file->getRealPath();
            if (!is_readable($filePath)) {
               throw new \Exception("Arquivo não pode ser lido: $filePath");
            }

            if (($handle = fopen($file->getRealPath(), 'r')) !== false) {
                while (($row = fgetcsv($handle, 1000, ",")) !== false) {
                    if (!$first) {
                        $first = true;
                        continue;
                    }
                    // Verifica se o número de colunas no CSV é igual ao esperado
                    if (count($row) !== count(self::COLUMNS)) {
                        throw new \Exception("Formato inválido do arquivo CSV. Verifique as colunas.");
                    }

                    $rowData = array_combine(self::COLUMNS, $row);
                    $data[] = $rowData;

                    if ($count === self::SIZEBATCH) {
                        $this->paymentRepository->insertBatch($data);
                        $count = 0;
                        $data = [];
                    }
                    ++$count;
                }

                if (!empty($data)) {
                  $this->paymentRepository->insertBatch($data);
                }
                fclose($handle);
            } else {
                throw new \Exception("Erro ao abrir o arquivo");
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("Erro no processamento do arquivo: " . $e->getMessage());
            return response()->json(['error' => 'Erro no processamento do arquivo.'], 500);
        }

        return response()->json(['message' => 'Arquivo processado com sucesso', 'data_count' => count($data)]);

    }

    public function getPayments($page)
    {
        return $this->paymentRepository->getPaginatedPayments(10, $page);
    }
}
