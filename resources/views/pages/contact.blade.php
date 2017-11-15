@extends('layout.main')
@push('style')
<link href="/css/about.css" rel="stylesheet">
@endpush

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

<!--Start Section Map-->
    <div data-src="images/map.png" style="width: 100%; height: 500px;"></div>
<!--End Section Map-->


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