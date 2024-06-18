<?php

namespace Tests\Unit\Services;

use Illuminate\Http\UploadedFile;
use Symfony\Component\HttpFoundation\Response;
use Tests\TestCase;
use App\Services\PaymentService;
use App\Interfaces\Repositories\PaymentRepositoryInterface;

class PaymentServiceTest extends TestCase
{
    protected $paymentRepositoryMock;

    protected function setUp(): void
    {
        parent::setUp();

        $this->temporaryDirectory = storage_path('app/testing');
        if (!file_exists($this->temporaryDirectory)) {
            mkdir($this->temporaryDirectory, 0777, true);
        }

        // Mock do PaymentRepositoryInterface
        $this->paymentRepositoryMock = $this->getMockBuilder(PaymentRepositoryInterface::class)->getMock();
    }

    public function test_processFile_success()
    {
        $csvData = [
            ["name", "governmentId", "email", "debtAmount", 'debtDueDate', 'debtId'],
            ["John Doe", "123456789", "john@example.com", 100.50, '2024-06-30', 'debt1'],
            ["Jane Doe", "987654321", "jane@example.com", 200.75, '2024-07-15', 'debt2'],
        ];

        $fileName = 'payments.csv';
        $csvFile = $this->createTemporaryCsvFile($fileName, $csvData);

        $this->paymentRepositoryMock->expects($this->once())
            ->method('insertBatch')
            ->willReturn(true);

        $paymentService = new PaymentService($this->paymentRepositoryMock);

        $response = $paymentService->processFile(new UploadedFile($csvFile, $fileName));

        $this->assertEquals(Response::HTTP_OK, $response->status());
        $this->assertStringContainsString('Arquivo processado com sucesso', $response->getContent());
    }

    public function test_getPayments(): void
    {
        $this->paymentRepositoryMock->expects($this->once())
            ->method('getPaginatedPayments')
            ->willReturn([]);

        $paymentService = new PaymentService($this->paymentRepositoryMock);

        $response = $paymentService->getPayments(1);

        $this->assertIsArray($response);
        $this->assertEmpty($response);
    }

    protected function createTemporaryCsvFile($fileName, array $data)
    {
        $filePath = storage_path('app/testing/' . $fileName);

        $file = fopen($filePath, 'w');

        foreach ($data as $row) {
            fputcsv($file, $row);
        }

        fclose($file);

        return $filePath;
    }
}
