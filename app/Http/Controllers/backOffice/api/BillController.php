<?php

namespace App\Http\Controllers\backOffice\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BillBookPurchaseReceipt;
use App\Models\BillItem;
use App\Models\UserFavorite;
use Illuminate\Support\Facades\DB;

class BillController extends Controller
{
    //
    public function getBillAll(Request $request) {
        $user = $request->user(); 
        $bill = BillBookPurchaseReceipt::where('user_id', $user->id)->get();
        return $this->responseData($bill);
    }

    public function createBill(Request $request) {
        $user = $request->user();

        $params = $request->all();
        $decodeVolId = json_decode($params['vol_ids']);
        $newFolder = "upload/" . date('Y') . "/" . date('m') . "/" . date('d') . "/";
        $imageSlip = (isset($params['image_slip'])) ? $this->uploadImage($newFolder, $params['image_slip'], "", "", time()) : "";
        
        $bill = BillBookPurchaseReceipt::create([
            'user_id' => $user->id,
            'quantity' => count($decodeVolId),
            'store_sell' => $params['store_sell'],
            'price' => $params['price'],
            'transport' => $params['transport'],
            'parcel_number' => $params['parcel_number'],
            'image_slip' => $imageSlip,
        ]);

        $dataInsertBillItems = [];
        $dataInsertUserBooks = [];

        foreach ($decodeVolId as $vol) {
            $dataInsertBillItems[] = [
                'bill_id' => $bill->id,
                'book_vol_id' => $vol->vol_id,
                'quantity' => 1,
                'price_per_unit' => ($vol->price) ?? 0,
                'discount_per_unit' => ($vol->discount) ?? 0,
            ];

            $dataInsertUserBooks[] = [
                'user_id' => $user->id,
                'book_vol_id' => $vol->vol_id
            ];

        }
        
        BillItem::insert($dataInsertBillItems);
        
        foreach ($dataInsertUserBooks as $data) {
            $existingRecord = DB::table('user_book_volumes')
                ->where('user_id', $data['user_id'])
                ->where('book_vol_id', $data['book_vol_id'])
                ->first();
        
            if ($existingRecord) {
                DB::table('user_book_volumes')
                    ->where('id', $existingRecord->id)
                    ->update([
                        'quantity' => $existingRecord->quantity + 1
                    ]);
            } else {
                DB::table('user_book_volumes')->insert([
                    'user_id' => $data['user_id'],
                    'book_vol_id' => $data['book_vol_id'],
                    'quantity' => 1,
                ]);
            }

            UserFavorite::where('user_id', $data['user_id'])
                    ->where('book_vol_id', $data['book_vol_id'])
                    ->delete();
        }


        return $this->responseData($bill);
    }

    // public function 

}
