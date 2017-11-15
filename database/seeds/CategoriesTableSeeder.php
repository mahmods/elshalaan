<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->generateDefualtCategories();
    }

    protected function generateDefualtCategories()
    {
        DB::table('categories')->insert([
            ['name' => 'خدماتنا', 'slug' => 'services'],
            ['name' => 'سابقة أعمالنا', 'slug' => 'portfolio'],
            ['name' => 'فريق العمل', 'slug' => 'team'],
            ['name' => 'المكتبة الالكترونية للاستثمار والتمويل', 'slug' => 'library'],
            ['name' => 'اتصل بنا', 'slug' => 'contact'],
        ]);
    }
}
