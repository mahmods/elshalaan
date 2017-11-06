@extends('layout.main')
@push('style')
<link href="/css/portfolio.css" rel="stylesheet">
@endpush
@section('content')
    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">{{$portfolio->name}}</h2>
        </div>
    </section>
    <!--End About Us-->

    <!--Start Section portfolio-->
    <section  class="portfolio">
        <div class="container">
            <div class="row ">
            @foreach ($portfolio->items as $t)
                <div class="col-s-12 col-m-6 col-l-4 portfolio-block ">
                    <div class="block">
                        <div class="img-block">
                            <img src="/images/{{ $t->image }}">
                        </div>
                        <p>{{ $t->description }}</p>
                    </div>
                </div>
            @endforeach
            </div>
        </div>
    </section>
    <!--End Section portfolio-->
@endsection