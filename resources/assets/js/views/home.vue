<template>
  <div>
      <app-header></app-header>
    <!--Start Section Header-->
    <section id="Header" class="header">
        <div class="container">
            <div class="logo2 wow fadeInLeft" data-wow-delay="1s">
                <img src="img/logo2.png">
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
                            <p>السبت - الخميس</p>
                            <span>9:00ص - 5:00م</span>
                        </div>
                    </div>
                    <div class="icon col-s-12 col-m-6 col-l-3">
                        <div class="icon-block"><i class="ti-phone"></i></div>
                        <div class="icon-content">
                            <h3>تواصل معنا</h3>
                            <p> 0020102598532158 </p>
                            <span>info@el-shalaan.com</span>
                        </div>
                    </div>
                    <div class="icon col-s-12 col-m-6 col-l-4">
                        <div class="icon-block"><i class="ti-place"></i></div>
                        <div class="icon-content">
                            <h3> المركز الرئيسي للشركة ( القاهرة ) </h3>
                            <p> فروع الشركة ( بني سويف ) </p>
                            <span>فروع تحت التأسيس ( اسكندرية – أسيوط ) </span>
                        </div>
                    </div>
                    <div class=" col-s-12 col-m-6 col-l-2 ">
                        <div class="message">
                            <span class="button">
                            <a  href="#Contact-us">ارسل لنا رساله  </a>  
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
                        <h2>عن مؤسسه الشعلان</h2>
                        <p>
                            لقد اثرت التطورات الاقتصادية السريعة والمتلاحقة علي قرارات العديد من المستثمرين سواء علي مستوي الأسواق المحلية او علي مستوي الأسواق الإقليمية وكان لزاما علينا ايمانا منا بدور المستثمرين في التنمية الاقتصادية الشاملة للمجتمعات ان نقوم بتكريس مجموعة من الخبراء والمستشارين الاقتصاديين للوقوف علي هذه المتغيرات ودراسة سلوكها وتاثيراتها علي قرارات المستثمر
                            <br> <br>لذا ومن اجل قرار استثماري رشيد قائم علي أسس علمية واقتصادية واقعية قامت الشعلان للإستشارات الرائدة فى مجالات دراسات الجدوى و خطط الأعمال في مصر ودول الخليج العربي بما لديها من موارد بشرية خبيرة في القطاعات الاقتصادية المختلفة الصناعية والتجارية والزراعية والخدمية والعقارية بتدشين اكبر فريق استشاري في مصر والشرق الأوسط ويساند مؤسسة الشعلان من الظهير التسويقي شركة مها كود للبرمجيات والتسويق الالكتروني  .

                        </p>
                    </div>
                </div>
                <div class="col-s-12 col-m-12 col-l-5">
                    <div class="abut-block-1">
                        <h3>رؤيتنا</h3>
                        <p>
                            الريادة في مجال الاستشارات الاقتصادية والمرجع الأفضل على مستوى الوطن العربي لتقديم الحلول والاستشارات الاقتصادية المتطورة طبقا لأحدث الأساليب والأدوات العلمية .
                        </p>
                    </div>
                    <div class="abut-block-2">
                        <h3>رسالتنا</h3>
                        <p>
                            تعزيز القرار الاستثماري لرجال الاعمال واتخاذ القرار الرشيد طبقا لحقائق مجتمع الاعمال
                        </p>
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
                    <h2>خدماتنا</h2>
                    <!--
                    <p>
                        هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،
                    </p>
-->
                </div>
            </div>
            <div class="row">
                <div v-for="item in services" :key="item.id" class="col-s-12 col-m-6 col-l-4">
                    <div class="serviece-block">
                        <span>
                            <i><img :src="'/img/'+item.image"></i>
                        </span>
                        <h3>{{item.title}}</h3>
                        <p>{{item.content}}</p>

                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--End Section serviece-->

    <!--Start Section portfolio-->

    <section id="portfolio" class="portfolio">
        <div class="container">
            <h2>سابقة أعمالنا </h2>
            <div class="row carousel-slider2 tornado-ui">
                <div v-for="item in portfolio" :key="item.id" class="col-s-12 col-m-6 col-l-4 portfolio-block ">
                    <div class="block">
                        <div class="img-block">
                            <img :src="'/img/'+item.image">
                        </div>
                        <p>{{item.content}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!--End Section portfolio-->
    <!--Start Section Our Team-->

    <section id="ourTeam" class="our-team">
        <div class="container">
            <h2>فريق العمل</h2>
            <div class="row carousel-slider tornado-ui">

                <div v-for="item in team" :key="item.id" class="col-s-12 col-m-6 col-l-3 team-block ">
                    <div class="img-block">
                        <img :src="'/img/'+item.image">
                    </div>
                    <div class="p-block">
                        <p>{{item.title}}</p>
                        <p>{{item.content}}</p>
                    </div>
                </div>
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

    <!--Start Section Send massage-->
    <section class="send-massage">
        <div class="container">
            <h2>ارسل لنا رساله</h2>
            <form>
                <div class="row">
                    <div class="col-s-12 col-m-6 col-l-4">
                        <input type="text" placeholder=" الاسم: ">
                    </div>
                    <div class="col-s-12 col-m-6 col-l-4">
                        <input type="text" placeholder=" البريد الإلكترونى :">
                    </div>
                    <div class="col-s-12 col-m-12 col-l-4">
                        <input type="text" placeholder="رقم الهاتف :">
                    </div>
                    <div class="col-s-12 icon">
                        <textarea placeholder="  الرساله :  "></textarea>
                        <a href="#">إرسال</a>
                    </div>
                </div>
            </form>
        </div>
    </section>
    <!--End Section Send massage-->
    <app-footer></app-footer>
  </div>
</template>

<script>
import appHeader from './app-header'
import appFooter from './app-footer'
import {get} from '../helpers/api'
export default {
    components: {
      appHeader, appFooter
   },
   data() {
       return {
           services: [],
           portfolio: [],
           team: []
       }
   },
   created() {
       get('posts/query?category=خدماتنا')
       .then(repsonse => {
           this.services = repsonse.data.items
       })
       get('posts/query?category=سابقة أعمالنا')
       .then(repsonse => {
           this.portfolio = repsonse.data.items
       })
       get('posts/query?category=فريق العمل')
       .then(repsonse => {
           this.team = repsonse.data.items
       })
   }
}
</script>

<style>

</style>
