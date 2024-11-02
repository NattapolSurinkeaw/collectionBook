<?php

namespace App\Http\Controllers\backoffice\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RoleUser;

class RoleController extends Controller
{
    //
    public function createNewcate(Request $request) {
        $param = $request->all();
        $lastPriority = RoleUser::max('priority');
        $role = RoleUser::create([
            'role_name' => $param["role_name"],
            'status_display' => true,
            'cate_id' => "",
            'priority' => $lastPriority+1
        ]);

        return $this->responseData($role);
    }
}
