<?php

Route::get('dashboard/{all?}', function () {
    return view('dashboard');
})->where('all', '^((?!api).)*');

Route::get('/content/{id}', 'PagesController@content');

Route::get('/{slug?}', 'PagesController@any');