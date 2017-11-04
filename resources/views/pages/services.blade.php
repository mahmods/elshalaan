@extends('layout.main')
@push('style')
<link href="css/services.css" rel="stylesheet">
@endpush
@section('content')

    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">خدماتنا  </h2>
        </div>
    </section>
    <!--End About Us-->

    <!--Start Section serviece-->
    <section id="Our-Serviece" class="serviece">
        <div class="container">
            <div class="row">

            </div>
            <div class="row">
            @foreach ($services->items as $t)
                <div class="col-s-12 col-m-6 col-l-4">
                    <div class="serviece-block">
                        <span>
                            <i><img src="/img/{{ $t->image }}"></i>
                        </span>
                        <h3>{{ $t->title }}</h3>
                        <p>{{ $t->content }}</p>

                    </div>
                </div>
            @endforeach
            </div>
        </div>
    </section>
    <!--End Section serviece-->
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
    <!--End Section Numbers-->
@endsection