<?php

namespace App\Http\Controllers\frontOffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PagesController extends Controller
{
    //
    public function index() {
        return view('frontOffice.pages.home');
    }

    public function mangaPage() {
        return view('frontOffice.pages.manga');
    }

    public function lightnovelPage() {
        return view('frontOffice.pages.lightnovel');
    }
}
