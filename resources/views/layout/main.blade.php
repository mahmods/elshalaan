@php
    $nav = DB::table('nav')->get();//->orderBy('order', 'asc')->get();
@endphp
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="A Description Of The Project">
    <meta name="keywords" content="The keywords">
    <title>مؤسسة شعلان</title>
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">
    <!-- Required CSS Files -->
    <link href="{{asset('/css/tornado-rtl.css')}}" rel="stylesheet">
    <link href="{{asset('/css/animations.css')}}" rel="stylesheet">
    <link href="{{asset('/css/theme.css')}}" rel="stylesheet">
    @stack('style')
</head>

<body>
    <!--Start Navigation-->
    <section class="navigation  sticky-navbar">
        <div class="container">
                <div class=" logo">
                    <a href="/"><img src="/images/logo.png"></a>
                </div>

                    <nav class="navbar ">
                        <div class="navigation-menu scrollspy ">
                            <ul>
                            @foreach ($nav as $n)
                                <li class="{{ Request::is($n->url) ? 'active' : '' }}"><a href="/{{$n->url}}">{{$n->name}}</a></li>
                            @endforeach
                            </ul>
                        </div>
                    </nav>

            <!--

            <div class="email ti-email">HR@alshalaan.com</div>

            <div class="call ti-ios-telephone"><span>+201 11563  5832 85</span></div>

            
            <div class="languge">
                <div class="en"><a href="#">En</a></div>
                
                <div class="dropdown-languge">
                    <a href="#">AR</a>
                </div>

            </div>
-->

        </div>
    </section>
    <!--End Navigation-->

    @yield('content')

    <!--Start Section Copy Right-->
    <section class="copy-right">
        <div class="container">
            <div class="row">
                <div class="copy col-s-12 col-m-6 col-l-6">
                    <p>جميع الحقوق محفوظه لمؤسسه الشعلان</p>
                </div>
                <div class="logo col-s-12 col-m-6 col-l-6 "><img src="/images/mahacode.png"></div>

            </div>
        </div>
    </section>
    <!--End Section Copy Right-->


    <!-- Required JS Files -->
    <script src="{{asset('js/jquery.min.js')}}"></script>
    <script src="{{asset('js/tornado.js')}}"></script>
    <script src="{{asset('js/script.js')}}"></script>
    @stack('scripts')
</body>

</html>
