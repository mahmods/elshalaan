<template>
      <!-------------------------------------------Start Navigation---------------------------------------->
    <section class="navigation  sticky-navbar">
        <div class="container">
                <div class=" logo">
                    <router-link to="/"><img src="img/logo.png"></router-link>
                </div>

                    <nav class="navbar ">
                        <div class="navigation-menu scrollspy ">
                            <ul>
                                <li :class="{active: $route.path === '/'}"><router-link to="/">الرئيسيه</router-link></li>
                                <li :class="{active: $route.path === '/about'}"><router-link to="/about"> من نحن</router-link></li>
                                <li :class="{active: $route.path === '/services'}"><router-link to="/services">خدماتنا </router-link></li>
                                <li :class="{active: $route.path === '/portfolio'}"><router-link to="/portfolio">سابقة أعمالنا    </router-link></li>
                                <li :class="{active: $route.path === '/team'}"><router-link to="/team">فريق العمل   </router-link></li>
                                <li :class="{active: $route.path === '/content'}"><router-link to="/content">  المحتوي  </router-link></li>
                                <li :class="{active: $route.path === '/library'}"><router-link to="/library"> المكتبة الالكترونية للاستثمار والتمويل   </router-link></li>
                                <li :class="{active: $route.path === '/contact'}"><router-link to="/contact">اتصل بنا </router-link></li>
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
    <!------------------------------------------End Navigation------------------------------------>

</template>

<script>
export default {

}
</script>

<style>

</style>
