@extends('layout.main')
@push('style')
<link href="/css/content.css" rel="stylesheet">
@endpush
@section('content')

    <!--Start About Us-->
    <section class="title">
        <div class="container">
            <h2 class="right">صفحة المحتوي </h2>
        </div>
    </section>
    <!----End About Us--->

    <!--Start Section Content-->
    <section>
        <div class="container">
            <div class="content">
                <div class="img" style="background-image: url('/images/{{$post->image}}');">
                </div>
                <h2>{{$post->title}}</h2>
                <div class="time1">
                    <span class="ti-date-range">{{$post->created_at}}</span>
                </div>
                <div class="time2">
                    <span class="ti-account-box"> الكاتب : {{$post->user->name}} </span>
                    <span class="ti-folder">  القسم : {{$post->category->name}}</span>
                </div>
                {!!$post->content!!}
                <div class="share">
                    <button class="btn  labeled ti-facebook">facebook</button>
                    <button class="btn  labeled ti-twitter">twitter</button>
                    <button class="btn  labeled ti-googleplus">googleplus</button>
                    <button class="btn  labeled ti-linkedin">linkedin</button>
                    <span>  مشاركة المقال</span>
                </div>
            </div>
        </div>
    </section>
    <!--Start Section Content-->
@endsection