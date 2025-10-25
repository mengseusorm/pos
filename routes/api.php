<?php

use App\Http\Controllers\Api\Admin\ItemCategoryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// Public routes (no CSRF protection needed for these routes)
Route::post('/register', [AuthController::class, 'register'])->middleware('guest');
Route::post('/login', [AuthController::class, 'login'])->middleware('guest');

// Protected routes

Route::prefix('admin')->name('admin.')->middleware(['auth:sanctum'])->group(function(){ 
    Route::prefix('item-categories')->name('item-categories.')->group(function(){ 
        Route::get('/', [ItemCategoryController::class, 'index'])->name('index');
        Route::post('/', [ItemCategoryController::class, 'store'])->name('store');
        Route::get('/{id}', [ItemCategoryController::class, 'show'])->name('show');
        Route::put('/{id}', [ItemCategoryController::class, 'update'])->name('update');
        Route::delete('/{id}', [ItemCategoryController::class, 'destroy'])->name('destroy');
    });
    Route::post('/logout', [AuthController::class, 'logout']);
});

// Route::middleware(['auth:sanctum'])->group(function () {
//     Route::get('/user', [AuthController::class, 'user']);
// });


Route::get('/test',function(){
    return response()->json('helo');
});
