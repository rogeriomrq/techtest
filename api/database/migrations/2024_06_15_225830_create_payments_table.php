<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('payments', static function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->bigInteger('governmentId');
            $table->string('email');
            $table->decimal('debtAmount', 10, 2);
            $table->date('debtDueDate');
            $table->uuid('debtId');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
