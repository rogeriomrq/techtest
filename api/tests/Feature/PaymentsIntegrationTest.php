<?php
use PHPUnit\Framework\TestCase;
use GuzzleHttp\Client;
use Symfony\Component\HttpFoundation\Response;

class PaymentsIntegrationTest extends TestCase
{
    protected $client;

    protected function setUp(): void
    {
        $this->client = new Client([
            'base_uri' => env('APP_URL','http://localhost'). '/8080', // URL do seu ambiente de teste
            'http_errors' => false,
        ]);
    }

    public function testUploadEndpoint()
    {
        $response = $this->client->post('/upload/payments', [
            'multipart' => [
                [
                    'name'     => 'file',
                    'contents' => fopen('/path/to/test-file.csv', 'r'),
                    'filename' => 'test-file.csv',
                ],
            ],
        ]);

        $this->assertEquals(Response::HTTP_OK, $response->getStatusCode());

        $responseBody = json_decode($response->getBody()->getContents(), true);
        $this->assertArrayHasKey('message', $responseBody);
        $this->assertEquals('File processed successfully', $responseBody['message']);
    }
}
