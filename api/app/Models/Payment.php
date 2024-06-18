<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    /**
     * Os atributos que são atribuíveis em massa.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'governmentId',
        'email',
        'debtAmount',
        'debtDueDate',
        'debtId',
    ];

    /**
     * Os atributos que devem ser convertidos para os tipos nativos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'debtDueDate' => 'date',
        'debtAmount' => 'decimal:2',
        'debtId' => 'string',
    ];
}
