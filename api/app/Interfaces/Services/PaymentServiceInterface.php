<?php

namespace App\Interfaces\Services;

interface PaymentServiceInterface
{
    public function processFile($file);
    public function getPayments($page);
}
