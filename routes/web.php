<?php

Route::get('dashboard', function () {
    return view('dashboard');
});

Route::get('dashboard/{all}', function () {
    return view('dashboard');
})->where('all', '^((?!api).)*');

Route::get('/', 'PagesController@home');
Route::get('/about', 'PagesController@about');
Route::get('/contact', 'PagesController@contact');
Route::get('/content/{id}', 'PagesController@content');

Route::get('/{category}', 'PagesController@category');