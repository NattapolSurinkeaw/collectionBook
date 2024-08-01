<?php

namespace App\Http\Controllers\backoffice\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\RoleUser;

class UserController extends Controller
{
    //
    public function getUserAll() {
        $role_user = RoleUser::all();
        $users = User::all();
        $data = array();
        $data['role'] = $role_user;
        $data['user'] = $users;
        return $this->responseData($data);
    }
}
