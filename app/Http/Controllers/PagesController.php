<?php

namespace App\Http\Controllers;

use Request, Route, View;

class PagesController extends Controller
{
    public function home() {
        return view('pages.home', [
            'services' => $this->getCategory('services'),
            'portfolio' => $this->getCategory('portfolio'),
            'team' => $this->getCategory('team')
            ]);
    }

    public function about() {
        return view('pages.about', [
            'team' => $this->getCategory('team')
            ]);
    }

    public function content($id)
    {
        return view('pages.content', [
            'post' => $this->getPost($id)
            ]);
    }

    public function category($category) {
        if (!View::exists('pages.'.$category)) {
            abort(404);
        }
        return view('pages.'.$category, [(string)$category => $this->getCategory($category)]);
    }
    
    protected function getCategory($category) {
        $request = Request::create('api/posts/query', 'GET', ['category'=>$category]);
        Request::replace($request->input());
        
        return json_decode(Route::dispatch($request)->getContent());
    }

    protected function getPost($id) {
        $request = Request::create('api/posts/'.$id, 'GET');
        Request::replace($request->input());
        
        return json_decode(Route::dispatch($request)->getContent());
    }
}
