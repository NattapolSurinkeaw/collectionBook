<?php

namespace App\Http\Controllers\backOffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;
use App\Models\BillBookPurchaseReceipt;

class PagesController extends Controller
{
    //
    public function index() {
        return Inertia::render('Dashboard');
    }

    public function home() {
        return Inertia::render('managePage/Page');
    }

    public function manageProfile() {
        return Inertia::render('Profile/Edit');
    }

    public function manageCategory() {
        return Inertia::render('manageCategory/CategoryPage');
    }

    public function manageUser() {
        return Inertia::render('manageUser/UserPage');
    }

    public function manageRole() {
        return Inertia::render('manageUser/RolePage');
    }

    public function webcontent() {
        return Inertia::render('manageContent/WebContent');
    }

    public function bookPage() {
        return Inertia::render('manageBook/Book');
    }

    public function bookDetailPage($id) {
        $book = Book::find($id);
        // dd($book);
        return Inertia::render('manageBook/BookDetail', [
            'dataBook' => $book
        ]);
    }

    public function billPage() {
        return Inertia::render('manageBill/Bill');
    }

    public function billDetailPage($id) {
        $bill = BillBookPurchaseReceipt::find($id);
        return Inertia::render('manageBill/BillDetail', [
            'data' => $bill
        ]);
    }

    public function toBuyPage() {
        return Inertia::render('manageBook/Book');
    }

    // ตั้งค่า
}
