<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File;

abstract class Controller
{
    //

    public function uploadImage($folderPath= "upload/", $image = NULL, $preName="", $postName = "", $customName = NULL){
        if($image) {
            /* Checking folder */
            if(!file_exists($folderPath)){
                File::makeDirectory($folderPath, $mode = 0777, true, true);
            }
            $extName = "." .$image->extension();
            $name = ($customName !== NULL)? str_replace($extName,"",$customName) :time();
            $fullName = $preName.$name.$postName;
            $newImageName = $fullName.$extName;
            if(file_exists($folderPath.$newImageName)){
                for($ii = 1; true; $ii++){
                    $editNameDuplicate = $fullName."({$ii})".$extName;
                    if(!file_exists($folderPath.$editNameDuplicate)){
                        $newImageName = $editNameDuplicate;
                        break;
                    }
                }
            }
            if($image->move($folderPath, $newImageName)){
                return $folderPath.$newImageName;
            }
        }
        return false;
    }

    public function deleteFile($path) {
        if (File::exists(public_path($path))) {
            File::delete(public_path($path));
        }
        return File::exists(public_path($path));
    }

    public function responseData($data) {
        if(!$data) {
            return response()->json([
                'status' => 'error', 
                'message' => '$data'
            ], 404);
        }

        return response()->json([
            'status' => 'success', 
            'data' => $data
        ], 200);
    }
}
