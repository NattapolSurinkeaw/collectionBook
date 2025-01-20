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
use App\Models\Author;
use App\Models\Publisher;
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

    public function createIllustrator(Request $request) {
        $illust = Illustrator::create([
            'illust_name' => $request->input('title'),
            'another_name' => $request->input('another')
        ]);

        return $this->responseData($illust);
    }

    public function editIllustrator(Request $request, $id) {
        $illust = Illustrator::find($id);
        $illust->illust_name = $request->input('title');
        $illust->another_name = $request->input('anothor');
        $illust->save();

        return $this->responseData($illust);
    } 

    public function deleteIllustrator($id) {
        $illust = Illustrator::find($id);
        $illust->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully'
        ], 202);
    }

    public function getAuthorAll() {
        $author = Author::all();
        return $this->responseData($author);
    }

    public function createAuthor(Request $request) {
        $params = $request->all();
        $author = Author::create([
            'author_name' => $params['title'],
            'another_name' => $params['anothor']
        ]);
        return $this->responseData($author);
    }

    public function editAuthor(Request $request, $id) {
        $author = Author::find($id);
        $author->author_name = $request->input('title');
        $author->another_name = $request->input('anothor');
        $author->save();

        return $this->responseData($author);
    }

    public function deleteAuthor($id) {
        $author = Author::find($id);
        $author->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Category deleted successfully'
        ], 202);
    }

    public function getPublisherAll() {
        $publisher = Publisher::all();
        return $this->responseData($publisher);
    }

    public function createPublisher(Request $request) {
        $params = $request->all();
        $newFolder = "upload/" . date('Y') . "/" . date('m') . "/" . date('d') . "/";
        $thumbnail = (isset($params['thumbnail'])) ? $this->uploadImage($newFolder, $params['thumbnail'], "", "", 'front_'.time()) : "";
        $publisher = Publisher::create([
            'name_TH' => $params['name_TH'],
            'name_EN' => $params['name_EN'],
            'thumbnail' => $thumbnail,
        ]);

        return $this->responseData($publisher);
    }

    public function editPublisher(Request $request, $id) {
        $publisher = Publisher::find($id);

        $params = $request->all();
        $files = $request->allFiles();
        $newFolder = "upload/" . date('Y') . "/" . date('m') . "/" . date('d') . "/";
        $thumbnail = (isset($files['thumbnail'])) ? $this->uploadImage($newFolder, $files['thumbnail'], "", "", 'front_'.time()) : $publisher->thumbnail;
        $publisher->update([
            'name_TH' => $params['name_TH'],
            'name_EN' => $params['name_EN'],
            'thumbnail' => $thumbnail,
        ]);

        return $this->responseData($publisher);
    }

    public function deletePublisher($id) {
        $publish = Publisher::find($id);
        $publish->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'delete publisher data successfully'
        ], 200);
    }

    public function getCategoryAll() {
        $categories = BookCategory::all();
        return $this->responseData($categories);
    }

    public function createCategoryBook(Request $request) {
        $params = $request->all();
        $catebook = BookCategory::create([
            'title_cate' => $params['title_cate'],
            'description_cate' => $params['description_cate'],
            'priority' => 1,
            'status_display' => 1,
        ]);

        return $this->responseData($catebook);
    }

    public function editCategoryBook(Request $request, $id) {
        $catebook = BookCategory::find($id);
        $params = $request->all();

        $catebook->update([
            'title_cate' => $params['title_cate'],
            'description_cate' => $params['description_cate'],
        ]);

        return $this->responseData($catebook);
    }

    public function deleteCategoryBook($id) {
        $catebook = BookCategory::find($id);
        $catebook->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'category deleted successfully'
        ], 200);
    }

    public function addNewBook(Request $request) {
        $params = $request->all();
        $book = Book::create([
            'title_TH' => $params['nameTH'],
            'title_EN' => $params['nameEN'],
            'title_Another' => $params['nameAT'],
            'description' => $params['description'],
            'lc_release_date' => $params['lcDate'],
            'cate_id' => $params['slcCategories'],
            'author_id' => $params['slcWriter'],
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
        $params = $request->all();
        $files = $request->allFiles();
        $book = Book::find($params['book_id']);
     
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
        $frontCover = (isset($files['frontImage'])) ? $this->uploadImage($newFolder, $files['frontImage'], "", "", 'front_'.time()) : "";
        $backCover = (isset($files['backImage'])) ? $this->uploadImage($newFolder, $files['backImage'], "", "", 'back_'.time()) : "";
        $spineBook = (isset($files['spineImage'])) ? $this->uploadImage($newFolder, $files['spineImage'], "", "", 'spine_'.time()) : "";

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


