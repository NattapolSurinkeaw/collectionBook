<?php

use App\Http\Controllers\backOffice\PagesController as BackOfficePagesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\frontOffice\PagesController as FrontOfficePagesController;
use App\Http\Controllers\backoffice\api\ApiController;
use App\Http\Controllers\backoffice\api\UserController;
use App\Http\Controllers\backoffice\api\BookController;
use App\Http\Controllers\backoffice\api\RoleController;
use App\Models\BookCategory;
use Illuminate\Http\Request;

Route::get('/', [FrontOfficePagesController::class, 'index']);
Route::get('/manga', [FrontOfficePagesController::class, 'mangaPage']);
Route::get('/lightnovel', [FrontOfficePagesController::class, 'lightnovelPage']);

// Route::get('/backoffice', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('getip', function (Request $request) {
    $publicIp = $request->ip();
    return $publicIp;
});

Route::prefix('/backoffice')->middleware(['auth', 'verified'])->group(function () {
    Route::get('/', [BackOfficePagesController::class, 'index']);
    Route::get('/dashboard', [BackOfficePagesController::class, 'index'])->name('dashboard');
    Route::get('/home', [BackOfficePagesController::class, 'home']);
    Route::get('/profile', [BackOfficePagesController::class, 'manageProfile']);
    Route::get('/category', [BackOfficePagesController::class, 'manageCategory']);
    Route::get('/user', [BackOfficePagesController::class, 'manageUser']);
    Route::get('/role', [BackOfficePagesController::class, 'manageRole']);
    Route::get('/webcontent', [BackOfficePagesController::class, 'webcontent']);
    Route::get('/book', [BackOfficePagesController::class, 'bookPage']);
    Route::get('/bookdetail/{id}', [BackOfficePagesController::class, 'bookDetailPage']);
    Route::get('/bill', [BackOfficePagesController::class, 'billPage']);
    Route::get('/billdetail/{id}', [BackOfficePagesController::class, 'billDetailPage']);
    Route::get('/tobuy', [BackOfficePagesController::class, 'toBuyPage']);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/editprofile', [ProfileController::class, 'editProfile']);
});

// api
Route::prefix('/api')->group(function () {
    Route::get('/getCate', [ApiController::class, 'getCatetegory']);
    Route::post('/postcate', [ApiController::class, 'createCatetegory']);
    Route::get('/getCateId/{id}', [ApiController::class, 'getCateById']);
    Route::post('/editCate/{id}', [ApiController::class, 'getEditCate']);
    Route::delete('/deleteCate/{id}', [ApiController::class, 'deleteCategory']);
    Route::post('/set-mode', [ApiController::class, 'setMode']);
    
    Route::get('/getuser', [UserController::class, 'getUserAll']);
    Route::post('/updateuser', [UserController::class, 'updateuser']);
    Route::post('/createnewcate', [RoleController::class, 'createNewcate']);
    Route::get('/getcatebackoffice', [UserController::class, 'getcatebackoffice']);
    Route::post('/savechangecate', [UserController::class, 'savechangecate']);

    Route::get('/bookall', [BookController::class, 'getBookAll']);
    Route::get('/writers', [BookController::class, 'getWriterAll']);
    Route::get('/illustrators', [BookController::class, 'getIllustAll']);
    Route::get('/categories-book', [BookController::class, 'getCategoryAll']);
    Route::get('/publishers', [BookController::class, 'getPublisherAll']);
    Route::post('/volume-book', [BookController::class, 'getVolumeBook']);
    Route::get('/bill', [BookController::class, 'getBillAll']);
    Route::post('/createBill', [BookController::class, 'createBill']);

    Route::post('/addnewbook', [BookController::class, 'addNewBook']);
    Route::post('/addnewvolume', [BookController::class, 'addNewVolume']);
});


require __DIR__.'/auth.php';
