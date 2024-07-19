<?php

namespace App\Http\Controllers\backoffice\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class ApiController extends Controller
{
    //
    public function getCatetegory() {
        $cate = Category::all();

        return response()->json([
            'status' => 'success',
            'data' => $cate
        ], 200);
    }

    public function createCatetegory(Request $request) {
        // dd($request->all());
        $param = $request->all();
        // $file = $param['imageCate'];

        $newFolder = "upload/" . date('Y') . "/" . date('m') . "/" . date('d') . "/";
        $imageCate = (isset($param['imageCate'])) ? $this->uploadImage($newFolder, $param['imageCate'], "", "", time()) : "";

        $cate = Category::create([
            'title' => $param['title'],
            'description' => $param['description'],
            'keywords' =>  $param['keyword'],
            'slug' =>  $param['slug'],
            'link' =>  $param['link'],
            'image' =>  "/".$imageCate,
            'parent_id' =>  $param['parent_id'],
            'position' =>  ($param['parent_id'] == 1) ? $param['position'] : $param['position']+1  ,
            'meta_title' =>  $param['meta_title'],
            'meta_description' =>  $param['meta_description'],
            'meta_keywords' =>  $param['meta_keyword'],
            'h1' =>  $param['meta_h1'],
            'h2' =>  $param['meta_h2'],
            'priority' =>  $param['priority'],
            'status_display' =>  ($param['status_display'] == 'true')? 1 : 0,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $cate
        ], 201);
    }

    public function getCateById($id) {
        $cate = Category::find($id);
        if(!$cate) {
            return response()->json([
                'status' => 'error',
                'message' => 'category not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $cate
        ], 200);
    }

    public function getEditCate(Request $request, $id) {
        $param = $request->all();

        $cate = Category::find($id);
        if(!$cate) {
            return response()->json([
                'status' => 'error',
                'message' => 'category not found'
            ], 404);
        }

        $newFolder = "upload/" . date('Y') . "/" . date('m') . "/" . date('d') . "/";
        $imageCate = (isset($param['imageCate'])) ? $this->uploadImage($newFolder, $param['imageCate'], "", "", time()) : "";

        $cate = Category::create([
            'title' => $param['title'],
            'description' => $param['description'],
            'keywords' =>  $param['keyword'],
            'slug' =>  $param['slug'],
            'link' =>  $param['link'],
            'image' =>  "/".$imageCate,
            'parent_id' =>  $param['cate'],
            'position' =>  ($param['cate'] == 0) ? 0 : 1 ,
            'meta_title' =>  $param['meta_title'],
            'meta_description' =>  $param['meta_description'],
            'meta_keywords' =>  $param['meta_keyword'],
            'h1' =>  $param['meta_h1'],
            'h2' =>  $param['meta_h2'],
            'priority' =>  $param['priority'],
            'status_display' =>  ($param['status_display'] == 'true')? 1 : 0,
        ]);

        return response()->json([
            'status' => 'success',
            'data' => $cate
        ], 200);
    }

    public function deleteCategory($id) {
        $cate = Category::find($id);
        if(!$cate) {
            return response()->json([
                'status' => 'error',
                'message' => 'Category deleted failed'
            ], 404);
        }

        $cate->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully'
        ], 202);
    }
}
