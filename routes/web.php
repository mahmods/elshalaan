<?php

use MahaCMS\MahaCMS\Models\Page;
use MahaCMS\MahaCMS\Models\View;
use MahaCMS\Blog\Models\Post;
use MahaCMS\Blog\Models\Category;

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

//Route::get('/{category}', 'PagesController@category');


Route::get('/{slug}', function($slug) {
    $page = Page::where('slug', $slug)->first();
    if(!$page) {
        return 'not found';
    }
    $fields = [];
    for ($i=0; $i < count($page->fields); $i++) { 
        $f = new Field();
        $f->name($page->fields[$i]->name);
        $f->value($page->fields[$i]->value);
        if($page->fields[$i]->category) {
            $category = Category::where('slug', $page->fields[$i]->category)->first();
            $f->name($category->name);
            $f->value($category);
        }
        array_push($fields, $f);
    }
    dd($page->fields);
    return view('pages.' . $page->view->name, ['fields' => $fields]);
});

class Field {
    public $name;
    public $value;

    public function name($name)
    {
        $this->name = $name;

        return $this;
    }

    public function value($value)
    {
        $this->value = $value;

        return $this;
    }
}