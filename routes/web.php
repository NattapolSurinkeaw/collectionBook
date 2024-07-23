<?php

use App\Http\Controllers\backOffice\PagesController as BackOfficePagesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\frontOffice\PagesController as FrontOfficePagesController;
use App\Http\Controllers\backoffice\api\ApiController;

Route::get('/', [FrontOfficePagesController::class, 'index']);

// Route::get('/backoffice', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
    //     return Inertia::render('Dashboard');
    // })->name('dashboard');

Route::prefix('/backoffice')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [BackOfficePagesController::class, 'index']);
    Route::get('/dashboard', [BackOfficePagesController::class, 'index'])->name('dashboard');
    Route::get('/home', [BackOfficePagesController::class, 'home']);
    Route::get('/test', [BackOfficePagesController::class, 'test'])->name("test");
    Route::get('/page', [BackOfficePagesController::class, 'managePage']);
    Route::get('/profile', [BackOfficePagesController::class, 'manageProfile']);
    Route::get('/category', [BackOfficePagesController::class, 'manageCategory']);
    Route::get('/user', [BackOfficePagesController::class, 'manageUser']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/editprofile', [ProfileController::class, 'editProfile']);
});

// api
Route::get('/getCate', [ApiController::class, 'getCatetegory']);
Route::post('/postcate', [ApiController::class, 'createCatetegory']);
Route::get('/getCateId/{id}', [ApiController::class, 'getCateById']);
Route::post('/editCate/{id}', [ApiController::class, 'getEditCate']);
Route::delete('/deleteCate/{id}', [ApiController::class, 'deleteCategory']);

require __DIR__.'/auth.php';
