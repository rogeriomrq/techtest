<?php

namespace App\Interfaces\Repositories;

interface PaymentRepositoryInterface
{
    public function insertBatch(array $data);

    public function getPaginatedPayments($perPage, $page);
}
