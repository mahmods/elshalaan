@extends('layout.main')
@push('style')
<link href="/css/about.css" rel="stylesheet">
@endpush
@section('content')
    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">من نحن </h2>
        </div>
    </section>
    <!--End About Us-->

    <!--Start about-content-->
    <section class="about-content">
        <div class="container">
            <div class="row">
                <div class="col-s-12 col-m-4 col-l-3">
                    <img src="/images/logo3.png">
                </div>
                <div class="col-s-12 col-m-8 col-l-9">
                    <h2>{{$fields[0]->name}}</h2>
                    <p>{{$fields[0]->value}}</p>
                </div>
            </div>
        </div>
    </section>
    <!--End about-content-->

    <!--Start Section Our Massege-->
    <section class="our-massege">
        <div class="our view">
            <h2>{{$fields[1]->name}}</h2>
            <p>{{$fields[1]->value}}</p>
        </div>
        <div class="our massege">
            <h2>{{$fields[2]->name}}</h2>
            <p>{{$fields[2]->value}}</p>
        </div>
    </section>
    <!--End Section Our Massege-->

    <!--Start Section Contact Us-->
    <section id="Contact-us" class="contact-us">
        <div class="container">
            <div class="row row-zCenter">
                <div class="icon col-s-12 col-m-6 col-l-4">
                    <div class="icon-block"><i class="ti-android-mail"></i></div>
                    <div class="icon-content">
                        <h3>تواصل معنا عبر البريد</h3>
                        <p>{{$settings['email1']}}</p>
                        <span>{{$settings['email2']}}</span>
                    </div>
                </div>
                <div class="icon col-s-12 col-m-6 col-l-4">
                    <div class="icon-block"><i class="ti-phone"></i></div>
                    <div class="icon-content">
                        <h3> تواصل معنا عبر الهاتف</h3>
                        <p> {{$settings['phone1']}} </p>
                        <span>{{$settings['phone2']}}</span>
                    </div>
                </div>
                <div class="icon col-s-12 col-m-6 col-l-4">
                    <div class="icon-block"><i class="ti-place"></i></div>
                    <div class="icon-content">
                        <h3> المقر الرئيسى</h3>
                        <p>{{$settings['address']}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--End Section Contact Us-->
        <!--Start Section Our Team-->

    <section id="ourTeam" class="our-team">
        <div class="container">
            <h2>{{$fields[3]->name}}</h2>
            <div class="row carousel-slider tornado-ui">
            @foreach ($fields[3]->value->posts as $t)
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

    <!--End Section Our Team--->
@endsection