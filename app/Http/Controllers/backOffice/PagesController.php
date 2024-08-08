<?php

namespace App\Http\Controllers\backOffice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
}
