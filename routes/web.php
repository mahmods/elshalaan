<?php

Route::get('dashboard', function () {
    return view('dashboard');
});

Route::get('dashboard/{all}', function () {
    return view('dashboard');
})->where('all', '^((?!api).)*');

Route::get('/', function () {
    /////////////////////////////////////////////////////////////////////////////////////
    $request = Request::create('api/posts/query', 'GET', ['category'=>'services']);
    Request::replace($request->input());
    
    $response = json_decode(Route::dispatch($request)->getContent());
    $services = $response;

    /////////////////////////////////////////////////////////////////////////////////////
    $request = Request::create('api/posts/query', 'GET', ['category'=>'portfolio']);
    Request::replace($request->input());
    
    $response = json_decode(Route::dispatch($request)->getContent());
    $portfolio = $response;

    /////////////////////////////////////////////////////////////////////////////////////
    $request = Request::create('api/posts/query', 'GET', ['category'=>'team']);
    Request::replace($request->input());
    
    $response = json_decode(Route::dispatch($request)->getContent());
    $team = $response;

    return view('pages.home', ['services' => $services, 'portfolio' => $portfolio, 'team' => $team]);
});

Route::get('/about', function () {
    $request = Request::create('api/posts/query', 'GET', ['category'=>'team']);
    Request::replace($request->input());
    
    $response = json_decode(Route::dispatch($request)->getContent());
    $team = $response;

    return view('pages.about', ['team' => $team]);
});

Route::get('/team', function () {
    $request = Request::create('api/posts/query', 'GET', ['category'=>'team']);
    Request::replace($request->input());
    
    $response = json_decode(Route::dispatch($request)->getContent());
    $team = $response;
    return view('pages.team', ['team' => $team]);
});

Route::get('/services', function () {
    $request = Request::create('api/posts/query', 'GET', ['category'=>'services']);
    Request::replace($request->input());
    
    $response = json_decode(Route::dispatch($request)->getContent());
    $services = $response;
    return view('pages.services', ['services' => $services]);
});