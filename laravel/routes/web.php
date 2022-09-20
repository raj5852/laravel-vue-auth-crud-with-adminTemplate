<?php

use App\Http\Controllers\DemoController;
use App\Models\Book;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//    return $data = Book::orderBy('id', 'desc')->paginate(10);
//     return view('welcome', compact('data'))
        
//         ->with('i', (request()->input('page',1)-1) );
// });
Route::get('/',[DemoController::class,'index']);