@extends('layout.main')
@push('style')
<link href="/css/team.css" rel="stylesheet">
@endpush
@section('content')
    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">{{$fields[0]->name}}</h2>
        </div>
    </section>
    <!--End About Us-->

    <!--Start Section Our Team-->
    <section id="ourTeam" class="our-team">
        <div class="container">
            <div class="row">
            @foreach ($fields[0]->value->posts()->get() as $t)
                <div class="col-s-12 col-m-6 col-l-3 team-block ">
                    <div class="img-block">
                        <img src="/images/{{ $t->image }}">
                    </div>
                    <div class="p-block">
                        <p>{{ $t->title }}</p>
                        <p>{{ $t->description }}</p>
                    </div>
                </div>
            @endforeach
            </div>
        </div>
    </section>
    <!--End Section Our Team-->
@endsection