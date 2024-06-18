<?php

use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Symfony\Component\HttpFoundation\Response;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('login', static function () {
    return response('Login necessário', Response::HTTP_UNAUTHORIZED);
})->name('login');

Route::post('/upload/payments', [PaymentController::class, 'processFile']);
Route::prefix('payments')->group(function () {
    Route::get('/', [PaymentController::class, 'index']);
});
Route::group(['middleware' => ['auth:sanctum']], static function () {
    Route::post('logout', [AuthController::class, 'logout']);
});
