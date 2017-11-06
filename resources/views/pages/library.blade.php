@extends('layout.main')
@push('style')
<link href="/css/library.css" rel="stylesheet">
@endpush
@section('content')
    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">{{$library->name}}</h2>
        </div>
    </section>
    <!--End About Us-->

    <!------Start Section library-->
    <section id="library" class="library">
        <div class="container">
            <div class="row ">
            @foreach ($library->items as $t)
                <div class="col-s-12 col-m-6 col-l-4 ">
                    <div class="library-block">
                        <div class="img-block"><img src="/images/{{ $t->image }}"></div>
                        <h3>{{ $t->title }}</h3>
                        <p>{{ $t->description }}</p>
                        <div class="button">
                            <a href="/content/{{ $t->id }}">قراءة المزيد</a>
                        </div>
                    </div>
                </div>
            @endforeach
            </div>
        </div>
    </section>
@endsection