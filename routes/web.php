<?php

use Illuminate\Support\Facades\Route;

// Route::get('{any?}', function() {
//     return view('application');
// })->where('any', '.*');

Route::get('/', function () {
    return response()->json('Welcome to the web routes!');
});
