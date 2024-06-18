<?php

namespace Tests\Unit\Models;

use App\Models\Payment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class PaymentTest extends TestCase
{
    use RefreshDatabase; // Para garantir que o banco de dados seja redefinido após cada teste

    /**
     * Testa se é possível criar um pagamento com os atributos corretos.
     *
     * @return void
     */
    public function test_create_payment()
    {
        $data = [
            'name' => 'John Doe',
            'governmentId' => '123456789',
            'email' => 'john@example.com',
            'debtAmount' => 100.00,
            'debtDueDate' => '2023-01-01',
            'debtId' => 'abc123',
        ];

        $payment = Payment::create($data);

        $this->assertInstanceOf(Payment::class, $payment);
        $this->assertEquals($data['name'], $payment->name);
        $this->assertEquals($data['governmentId'], $payment->governmentId);
        $this->assertEquals($data['email'], $payment->email);
        $this->assertEquals($data['debtAmount'], $payment->debtAmount);
        $this->assertEquals(Carbon::parse($data['debtDueDate']), $payment->debtDueDate);
        $this->assertEquals($data['debtId'], $payment->debtId);
    }

    /**
     * Testa se os atributos fillable estão corretamente configurados.
     *
     * @return void
     */
    public function test_fillable_attributes()
    {
        $fillable = ['name', 'governmentId', 'email', 'debtAmount', 'debtDueDate', 'debtId'];
        $payment = new Payment();

        $this->assertEquals($fillable, $payment->getFillable());
    }

    /**
     * Testa se os atributos cast estão corretamente configurados.
     *
     * @return void
     */
    public function test_cast_attributes()
    {
        $casts = [
            'id' => 'int',
            'debtDueDate' => 'date',
            'debtAmount' => 'decimal:2',
            'debtId' => 'string',
        ];

        $payment = new Payment();

        $this->assertEquals($casts, $payment->getCasts());
    }
}
