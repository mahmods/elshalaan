<?php

namespace App\Http\Controllers;

use Request, Route, View;

use MahaCMS\MahaCMS\Models\Page;
use MahaCMS\Blog\Models\Post;
use MahaCMS\Blog\Models\Category;
use MahaCMS\MahaCMS\Classes\Field;

class PagesController extends Controller
{
    public function any($slug = 'home') {
        $page = Page::where('slug', $slug)->first();
        if(!$page) {
            abort(404);
        }
        $fields = $this->getPageFields($page);
        
        return view('pages.' . $page->view, ['fields' => $fields]);
    }
    public function home() {
        $page = Page::where('slug', 'home')->first();
        $fields = $this->getPageFields($page);
        return view('pages.' . $page->view, ['fields' => $fields]);
    }

    protected function getPageFields($page)
    {
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
        return $fields;
    }
    public function content($id)
    {
        return view('pages.content', [
            'post' => $this->getPost($id)
            ]);
    }

    protected function getPost($id) {
        $request = Request::create('api/posts/'.$id, 'GET');
        Request::replace($request->input());
        
        return json_decode(Route::dispatch($request)->getContent());
    } 
}
