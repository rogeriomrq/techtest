<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProcessFileRequest;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Interfaces\Services\PaymentServiceInterface;
use Symfony\Component\HttpFoundation\Response;

class PaymentController extends Controller
{
    public function __construct(protected PaymentServiceInterface $paymentService)
    {}

    /**
     * Display a listing of the payments.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        try {
            $page = $request->query('page', 1);
            $payments = $this->paymentService->getPayments($page);

            return response()->json($payments, Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao recuperar os pagamentos.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Process the uploaded file.
     *
     * @param ProcessFileRequest $request
     * @return JsonResponse
     */
    public function processFile(ProcessFileRequest $request)
    {
        try {
            $file = $request->file('file');
            $this->paymentService->processFile($file);

            return response()->json(['message' => 'Arquivo processado com sucesso!'], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json(['error' => 'Erro ao processar o arquivo.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
