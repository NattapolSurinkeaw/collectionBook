<?php

namespace App\Http\Controllers\backoffice\api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\RoleUser;
use Illuminate\Support\Facades\Redis;

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

    public function getcatebackoffice() {
        $role_user = RoleUser::all();
        $cate = Category::where('cate_type', 1)
        ->where('id', '!=' , 1)
        // ->where('cate_position', 2)
        ->where('status_display', true)->get();
        $data['role'] = $role_user;
        $data['cate'] = $cate;
        return $this->responseData($data);
    }

    public function savechangecate(Request $request) {
        $role = RoleUser::find($request->role_id);
        $role->update([
            'cate_id' => implode(',', $request->cate_id)
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'chnage data saved successfully'
        ], 200);
    }
}
