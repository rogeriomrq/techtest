<?php

namespace App\Providers;

use App\Interfaces\Repositories\PaymentRepositoryInterface;
use App\Repositories\PaymentRepository;
use Illuminate\Support\ServiceProvider;
use App\Interfaces\Services\PaymentServiceInterface;
use App\Services\PaymentService;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(PaymentServiceInterface::class, PaymentService::class);
        $this->app->bind(PaymentRepositoryInterface::class, PaymentRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
