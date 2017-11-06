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
                    <img src="/img/logo3.png">
                </div>
                <div class="col-s-12 col-m-8 col-l-9">
                    <h2>عن مؤسسه الشعلان</h2>
                    <p>
                        لقد اثرت التطورات الاقتصادية السريعة والمتلاحقة علي قرارات العديد من المستثمرين سواء علي مستوي الأسواق المحلية او علي مستوي الأسواق الإقليمية وكان لزاما علينا ايمانا منا بدور المستثمرين في التنمية الاقتصادية الشاملة للمجتمعات ان نقوم بتكريس مجموعة من الخبراء والمستشارين الاقتصاديين للوقوف علي هذه المتغيرات ودراسة سلوكها وتاثيراتها علي قرارات المستثمر
                        <br> لذا ومن اجل قرار استثماري رشيد قائم علي أسس علمية واقتصادية واقعية قامت شركة مشروعك الرائدة فى مجالات دراسات الجدوى و خطط الأعمال في مصر ودول الخليج العربي بما لديها من موارد بشرية خبيرة في القطاعات الاقتصادية المختلفة الصناعية والتجارية والزراعية والخدمية والعقارية بتدشين اكبر فريق استشاري في مصر والشرق الأوسط في الاستشارات الاقتصادية والإدارية للمشروعات الاستثمارية الجديدة والقائمة نحن وبما لدينا من خبرات متراكمة تمتد لعقود من الزمن نضع كافة خدماتنا في مجالات الاستشارات الاقتصادية والإدارية والتمويلية والمصرفية بين ايدي المستثمر الرشيد من اجل قرار استثماري فعال.

                    </p>
                </div>
            </div>
        </div>
    </section>
    <!--End about-content-->

    <!--Start Section Our Massege-->
    <section class="our-massege">
        <div class="our view">
            <h2>رؤيتنا</h2>
            <p>
                إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
            </p>
        </div>
        <div class="our massege">
            <h2>
                رسالتنا
            </h2>
            <p>
                إذا كنت تحتاج إلى عدد أكبر من الفقرات يتيح لك مولد النص العربى زيادة عدد الفقرات كما تريد، النص لن يبدو مقسما ولا يحوي أخطاء لغوية، مولد النص العربى مفيد لمصممي المواقع على وجه الخصوص، حيث يحتاج العميل فى كثير من الأحيان أن يطلع على صورة حقيقية لتصميم الموقع.
            </p>
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
                        <p>info@elshaalan.com</p>
                        <span>HR@Alshaalah.com</span>
                    </div>
                </div>
                <div class="icon col-s-12 col-m-6 col-l-4">
                    <div class="icon-block"><i class="ti-phone"></i></div>
                    <div class="icon-content">
                        <h3> تواصل معنا عبر الهاتف</h3>
                        <p> 0020102598532158 </p>
                        <span>0565231230456946</span>
                    </div>
                </div>
                <div class="icon col-s-12 col-m-6 col-l-4">
                    <div class="icon-block"><i class="ti-place"></i></div>
                    <div class="icon-content">
                        <h3> المقر الرئيسى</h3>
                        <p> 9 ش ابو بكر الصديق – ارض الحريه </p>
                        <span>بنى سويف</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--End Section Contact Us-->
        <!--Start Section Our Team-->

    <section id="ourTeam" class="our-team">
        <div class="container">
            <h2>{{$team->name}}</h2>
            <div class="row carousel-slider tornado-ui">
            @foreach ($team->items as $t)
                <div class="col-s-12 col-m-6 col-l-3 team-block ">
                    <div class="img-block">
                    <img src="/images/{{ $t->image }}">
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

    <!--End Section Our Team--->
@endsection