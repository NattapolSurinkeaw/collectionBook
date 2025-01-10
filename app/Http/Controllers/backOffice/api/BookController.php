<?php

namespace App\Http\Controllers\backoffice\api;

use App\Http\Controllers\Controller;
use App\Models\BillBookPurchaseReceipt;
use App\Models\BillItem;
use App\Models\UserBookVolume;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\BookCategory;
use App\Models\Illustrator;
use App\Models\Publisher;
use App\Models\Writer;
use App\Models\BookVolume;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    //
    public function getBookAll() {
        $books = Book::all();
        return $this->responseData($books);
    }

    public function getIllustAll() {
        $illust = Illustrator::all();
        return  $this->responseData($illust);
    }

    public function getWriterAll() {
        $writer = Writer::all();
        return $this->responseData($writer);
    }

    public function getPublisherAll() {
        $publisher = Publisher::all();
        return $this->responseData($publisher);
    }

    public function getCategoryAll() {
        $categories = BookCategory::all();
        return $this->responseData($categories);
    }

    public function addNewBook(Request $request) {
        // dd($request->all());
        $params = $request->all();
        // dd($params['slcCategories']);
        $book = Book::create([
            'title_TH' => $params['nameTH'],
            'title_EN' => $params['nameEN'],
            'title_Another' => $params['nameAT'],
            'description' => $params['description'],
            'lc_release_date' => $params['lcDate'],
            'cate_id' => $params['slcCategories'],
            'writer_id' => $params['slcWriter'],
            'ilust_id' => $params['slcIllust'],
            'publish_id' => $params['slcPublish'],
        ]);

        return $this->responseData($book);
    }

    public function getVolumeBook(Request $request) {
        // dd($request->all());
        $volume = Book::where('id', $request->input('book_id'))
            ->with('volumes')
            ->first();
        return $this->responseData($volume);
    }

    public function addNewVolume(Request $request) {
        // dd($request->all());
        $params = $request->all();
        $book = Book::find($params['book_id']);
        // dd($book);
        if(!$book) {
            return response()->json([
                'status' => 'error',
                'message' => 'Book not found',
            ], 404);
        }

        $frontCover = "";
        $backCover = "";
        $spineBook = "";
        $newFolder = "upload/" . date('Y') . "/" . date('m') . "/" . date('d') . "/";
        // dd($params);
        // if(isset($params['frontImage']) && $params['frontImage']) {
            $frontCover = (isset($params['frontImage'])) ? $this->uploadImage($newFolder, $params['frontImage'], "", "", 'front_'.time()) : "";
        // }
        // if(isset($params['backImage']) && $params['backImage']) {
            $backCover = (isset($params['backImage'])) ? $this->uploadImage($newFolder, $params['backImage'], "", "", 'back_'.time()) : "";
        // }
        // if(isset($params['spineImage']) && $params['spineImage']) {
            $spineBook = (isset($params['spineImage'])) ? $this->uploadImage($newFolder, $params['spineImage'], "", "", 'spine_'.time()) : "";
        // }
        // dd($frontCover, $backCover, $spineBook);
        $bookVol = BookVolume::create([
            'book_id' => $params['book_id'],
            'title_volumes' => $params['title_volumes'],
            'description' => $params['description'],
            'isbn_code' => $params['isbn_code'],
            'front_cover' => $frontCover,
            'back_cover' => $backCover,
            'book_spine' => $spineBook,
            'price' => $params['price'],
            'link_product' => $params['link_product'],
            'release_date' => $params['release_date'],
        ]);
        $book->update([
            'thumbnail' => $frontCover
        ]);
        return $this->responseData($bookVol);
    }

    public function getBillAll(Request $request) {
        $user = $request->user(); 
        $bill = BillBookPurchaseReceipt::where('user_id', $user->id)->get();
        return $this->responseData($bill);
    }

    public function createBill(Request $request) {
        $user = $request->user();

        $params = $request->all();
        $newFolder = "upload/" . date('Y') . "/" . date('m') . "/" . date('d') . "/";
        $imageSlip = (isset($params['image_slip'])) ? $this->uploadImage($newFolder, $params['image_slip'], "", "", time()) : "";

        $bill = BillBookPurchaseReceipt::create([
            'user_id' => $user->id,
            'quantity' => 1,
            'store_sell' => $params['store_sell'],
            'price' => $params['price'],
            'transport' => $params['transport'],
            'parcel_number' => $params['parcel_number'],
            'image_slip' => $imageSlip,
        ]);

        $dataInsertBillItems = [];
        $dataInsertUserBooks = [];
        $decodeVolId = json_decode($params['vol_ids']);
        // dd($decodeVolId);
        foreach ($decodeVolId as $vol) {
            $dataInsertBillItems[] = [
                'bill_id' => $bill->id,
                'book_vol_id' => $vol,
                'quantity' => 1,
                'price_per_unit' => 111,
                'discount_per_unit' => 0,
            ];

            $dataInsertUserBooks[] = [
                'user_id' => $user->id,
                'book_vol_id' => $vol
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
        }


        return $this->responseData($bill);
    }

    public function getBookAndVolume() {
        $books = DB::table('book_volumes')
            ->join('books', 'book_volumes.book_id', '=', 'books.id')
            ->select('books.*',
                'book_volumes.id as vol_id',
                'book_volumes.title_volumes as title_vol',
                'book_volumes.front_cover as front_cover',
                'book_volumes.price as vol_price'
            )
            ->get();
        return $this->responseData($books);
    }
}


