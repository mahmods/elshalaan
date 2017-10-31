<?php

Route::get('dashboard', function () {
    return view('dashboard');
});

Route::get('dashboard/{all}', function () {
    return view('dashboard');
})->where('all', '^((?!api).)*');

Route::get('{all}', function () {
    return view('Vue');
})->where('all', '^((?!api).)*');