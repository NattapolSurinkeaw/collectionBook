<?php

namespace App\Http\Controllers\backoffice\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\BookCategory;
use App\Models\Illustrator;
use App\Models\Publisher;
use App\Models\Writer;
use App\Models\BookVolume;

class BookController extends Controller
{
    //
    public function getBookAll() {
        $book = Book::all();
        return $this->responseData($book);
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
        $book = Book::create([
            'title_TH' => $params['nameTH'],
            'title_EN' => $params['nameEN'],
            'title_Another' => $params['nameAT'],
            'description' => $params['description'],
            'lc_release_date' => $params['lcDate'],
            'cate_id' => $params['slcCategories'],
            'writer_id' => $params['slcWriter'],
            'ilust_id' => $params['slcIllust'],
            'publis_id' => $params['slcWriter'],
        ]);

        return $this->responseData($book);
    }

    public function getVolumeBook(Request $request) {
        // dd(explode(',', $request->volume_id));
        $volume = BookVolume::whereIn('id', explode(',', $request->volume_id))->get();
        // dd($volume);
        return $this->responseData($volume);
    }

    public function addNewVolume(Request $request) {
        dd($request->all());
    }
}
