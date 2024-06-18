<?php

namespace Tests\Unit\Repositories;

use PHPUnit\Framework\TestCase;
use App\Interfaces\Repositories\PaymentRepositoryInterface;
use App\Repositories\PaymentRepository;

class PaymentRepositoryTest extends TestCase
{
    public function test_interface_methods_existence()
    {
        $expectedMethods = [
            'insertBatch',
            'getPaginatedPayments',
        ];

        $reflectionClass = new \ReflectionClass(PaymentRepository::class);

        foreach ($expectedMethods as $method) {
            $this->assertTrue(
                $reflectionClass->hasMethod($method),
                "Method $method not found in PaymentRepository."
            );

            $methodObj = $reflectionClass->getMethod($method);
            $declaringClass = $methodObj->getDeclaringClass();

            $this->assertTrue(
                $declaringClass->implementsInterface(PaymentRepositoryInterface::class),
                "Class {$declaringClass->name} does not implement PaymentRepositoryInterface."
            );
        }
    }
}
