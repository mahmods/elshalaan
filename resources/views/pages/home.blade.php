@extends('layout.main')

@push('scripts')
<script type='text/javascript'>
    $("#contact").submit(function(event) {
        event.preventDefault();
        $("#success").hide()
        $("#fail").hide()
        $.ajax({
            type: "POST",
            url: '/api/CRUD/contactus',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('api_token')
            },
            data: { 
                name: $('#name').val(),
                email: $('#email').val(),
                phone: $('#phone').val(),
                message: $('#message').val()
            },
            success: function (data){
                console.log(data)
                if(data.success) {
                    $("#success").show()
                } else {
                    $("#fail").show()
                }
            },
            fail: function () {
                $("#fail").show()
            }
        });
    });
</script>
@endpush

@section('content')
    <!--Start Section Header-->
    <section id="Header" class="header">
        <div class="container">
            <div class="logo2 wow fadeInLeft" data-wow-delay="1s">
                <img src="/images/logo2.png">
            </div>
        </div>
    </section>

    <!--End Section Header-->

    <!--Start Section Slogn Header-->
    <section class="slogn-header">
        <div class="overlay">
            <div class="container">
                <div class="row ">
                    <div class="icon col-s-12 col-m-6 col-l-3">
                        <div class="icon-block"><i class="ti-ios-time-line"></i></div>
                        <div class="icon-content">
                            <h3>ساعات العمل الرسميه</h3>
                            <p>{{$settings['work_days']}}</p>
                            <span>{{$settings['work_hours']}}</span>
                        </div>
                    </div>
                    <div class="icon col-s-12 col-m-6 col-l-3">
                        <div class="icon-block"><i class="ti-phone"></i></div>
                        <div class="icon-content">
                            <h3>تواصل معنا</h3>
                            <p> {{$settings['phone1']}} </p>
                            <span>{{$settings['email1']}}</span>
                        </div>
                    </div>
                    <div class="icon col-s-12 col-m-6 col-l-4">
                        <div class="icon-block"><i class="ti-place"></i></div>
                        <div class="icon-content">
                            <h3>{{$settings['address1']}}</h3>
                            <p> {{$settings['address2']}}</p>
                            <span>{{$settings['address3']}} </span>
                        </div>
                    </div>
                    <div class=" col-s-12 col-m-6 col-l-2 ">
                        <div class="message">
                            <span class="button">
                            <a  href="/contact">ارسل لنا رساله  </a>  
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--End Section Slogn Header-->


    <!--Start Section About Us-->
    <section id="About-Us" class="about-us">
        <div class="container-fluid">
            <div class="row">

                <div class=" col-s-12 col-m-12  col-l-7">
                    <div class="abut-block">
                        <h2>{{$fields[0]->name}}</h2>
                        <p>{{$fields[0]->value}}</p>
                    </div>
                </div>
                <div class="col-s-12 col-m-12 col-l-5">
                    <div class="abut-block-1">
                        <h3>{{$fields[1]->name}}</h3>
                        <p>{{$fields[1]->value}}</p>
                    </div>
                    <div class="abut-block-2">
                        <h3>{{$fields[2]->name}}</h3>
                        <p>{{$fields[2]->value}}</p>
                    </div>
                    <div class="abut-block-3">
                        <h3>الشعلان طبيب المستثمر</h3>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--End Section About Us-->


    <!--Start Section serviece-->
    <section id="Our-Serviece" class="serviece">
        <div class="container">
            <div class="row">
                <div class="head col-s-12 col-m-6">
                    <h2>{{ $fields[3]->name }}</h2>
                    <!--
                    <p>
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،
                    </p>
-->
                </div>
            </div>
            <div class="row">
            @foreach ($fields[3]->value->posts as $t)
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

    <!--Start Section portfolio-->

    <section id="portfolio" class="portfolio">
        <div class="container">
            <h2>{{ $fields[4]->name }} </h2>
            <div class="row carousel-slider2 tornado-ui">
                @foreach ($fields[4]->value->posts as $t)
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
    <!--Start Section Our Team-->

    <section id="ourTeam" class="our-team">
        <div class="container">
            <h2>{{$fields[5]->name}}</h2>
            <div class="row carousel-slider tornado-ui">

            @foreach ($fields[5]->value->posts as $t)
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

    <!--Start Section Send massage-->
    <section class="send-massage">
    <div class="container">
        <h2>ارسل لنا رساله</h2>
        <form id="contact">
            <div class="row">
                <div class="col-s-12 col-m-6 col-l-4">
                    <input id="name" type="text" placeholder=" الاسم: " required>
                </div>
                <div class="col-s-12 col-m-6 col-l-4">
                    <input id="email" type="email" placeholder=" البريد الإلكترونى :" required>
                </div>
                <div class="col-s-12 col-m-12 col-l-4">
                    <input id="phone" type="tel" placeholder="رقم الهاتف :">
                </div>
                <div class="col-s-12 icon">
                    <textarea id="message" placeholder="  الرساله :  " required></textarea>
                    <button type="submit">إرسال</button>
                </div>
            </div>
        </form>
        <br>
        <div id="success" style="display: none;" class="alert success">
            <strong> تم الإرسال</strong>
            <span class="close-alert ti-clear"></span>
        </div>
        <div id="fail" style="display: none;" class="alert danger">
        <strong> حدث خطأ!</strong> أعد المحاولة لاحقاً
            <span class="close-alert ti-clear"></span>
        </div>
    </div>
</section>
    <!--End Section Send massage-->
@endsection