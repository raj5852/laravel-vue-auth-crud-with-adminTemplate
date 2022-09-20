<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DemoController extends Controller
{
    //
    function index(Request $request){
        if($request->search){
            return "have";
        }else{
            return "not";
        }
    }
}
