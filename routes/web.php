<?php

Route::get('dashboard/{all}', function () {
    return view('dashboard');
})->where('all', '^((?!api).)*');

Route::get('{all}', function () {
    return view('Vue');
})->where('all', '^((?!api).)*');