@extends('layout.main')
@push('style')
<link href="css/team.css" rel="stylesheet">
@endpush
@section('content')
    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">{{$team->name}}</h2>
        </div>
    </section>
    <!--End About Us-->

    <!--Start Section Our Team-->
    <section id="ourTeam" class="our-team">
        <div class="container">
            <div class="row ">
            @foreach ($team->items as $t)
                <div class="col-s-12 col-m-6 col-l-3 team-block ">
                    <div class="img-block">
                        <img src="/img/{{ $t->image }}">
                    </div>
                    <div class="p-block">
                        <p>{{ $t->title }}</p>
                        <p>{{ $t->content }}</p>
                    </div>
                </div>
            @endforeach
            </div>
        </div>
    </section>

    <!--End Section Our Team-->
        <!-- Start Section Numbers-->
    <section class="number">
        <ul>
            <li><a href="#">01</a></li>
            <li><a href="#">02</a></li>
            <li><a href="#">03</a></li>
            <li><a href="#">04</a></li>
            <li><a href="#">05</a></li>
        </ul>
    </section>
    <!----------End Section Numbers---------->

@endsection