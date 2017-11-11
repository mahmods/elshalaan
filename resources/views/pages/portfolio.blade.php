@extends('layout.main')
@push('style')
<link href="/css/portfolio.css" rel="stylesheet">
@endpush
@section('content')
    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">{{$fields[0]->name}}</h2>
        </div>
    </section>
    <!--End About Us-->

    <!--Start Section portfolio-->
    <section  class="portfolio">
        <div class="container">
            <div class="row ">
            @foreach ($fields[0]->value->posts()->get() as $post)
                <div class="col-s-12 col-m-6 col-l-4 portfolio-block ">
                    <div class="block">
                        <div class="img-block">
                            <img src="/images/{{ $post->image }}">
                        </div>
                        <p>{{ $post->description }}</p>
                    </div>
                </div>
            @endforeach
            </div>
        </div>
    </section>
    <!--End Section portfolio-->
@endsection