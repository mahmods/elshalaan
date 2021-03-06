@extends('layout.main')
@push('style')
<link href="/css/services.css" rel="stylesheet">
@endpush
@section('content')

    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">{{$fields[0]->name}}</h2>
        </div>
    </section>
    <!--End About Us-->

    <!--Start Section serviece-->
    <section id="Our-Serviece" class="serviece">
        <div class="container">
            <div class="row">

            </div>
            <div class="row">
            @foreach ($fields[0]->value->posts()->get() as $t)
                <div class="col-s-12 col-m-6 col-l-4">
                    <div class="serviece-block">
                        <span>
                            <i><img src="/images/{{ $t->image }}"></i>
                        </span>
                        <h3>{{ $t->title }}</h3>
                        <p>{{ $t->description }}</p>

                    </div>
                </div>
            @endforeach
            </div>
        </div>
    </section>
    <!--End Section serviece-->
@endsection