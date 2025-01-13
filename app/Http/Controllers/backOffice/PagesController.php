<?php

namespace App\Http\Controllers\backOffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Book;
use App\Models\BillBookPurchaseReceipt;
use App\Models\BillItem;

class PagesController extends Controller
{
    //
    public function redirectLogin() {
        return redirect('login');
    }

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

    public function authorPage() {
        return Inertia::render('manageAuthor/AuthorPage');
    }

    public function illustPage() {
        return Inertia::render('manageIllustrator/IllustratorPage');
    }

    public function publisherPage() {
        return Inertia::render('managePublisher/PublisherPage');
    }

    public function billPage() {
        return Inertia::render('manageBill/Bill');
    }

    public function billDetailPage($id) {
        $bill = BillBookPurchaseReceipt::find($id);
        $bookItem = BillItem::where('bill_id', $bill->id)
        ->join('book_volumes', 'bill_items.book_vol_id', '=', 'book_volumes.id')
        ->join('books', 'book_volumes.book_id', '=', 'books.id')
        ->get();
        return Inertia::render('manageBill/BillDetail', [
            'bill' => $bill,
            'bookItem' => $bookItem
        ]);
    }

    public function toBuyPage() {
        return Inertia::render('manageBook/Book');
    }

    // ตั้งค่า
}
