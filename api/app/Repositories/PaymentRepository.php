<?php

namespace App\Repositories;

use App\Interfaces\Repositories\PaymentRepositoryInterface;
use App\Models\Payment;

class PaymentRepository implements PaymentRepositoryInterface
{
    protected $model;
    public function __construct(Payment $model)
    {
        $this->model = $model;
    }
    public function insertBatch(array $data)
    {
        $this->model->insert($data);
    }

    public function getPaginatedPayments($perPage, $page)
    {
        return $this->model->paginate($perPage, ['*'], 'page', $page);
    }
}
