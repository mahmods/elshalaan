<?php

use Illuminate\Database\Seeder;

class NavTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('nav')->insert([
            ['name' => 'الرئيسية', 'url' => 'home'],
            ['name' => 'من نحن', 'url' => 'about'],
            ['name' => 'خدماتنا', 'url' => 'services'],
            ['name' => 'سابقة أعمالنا', 'url' => 'portfolio'],
            ['name' => 'فريق العمل', 'url' => 'team'],
            ['name' => 'المكتبة الالكترونية للاستثمار والتمويل', 'slug' => 'library'],
            ['name' => 'اتصل بنا', 'url' => 'contact'],
        ]);
    }
}
