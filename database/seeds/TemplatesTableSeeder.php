<?php

use Illuminate\Database\Seeder;

class TemplatesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('templates')->insert([
            ['name' => 'home', 'fields' => 6, 'fields_type' => 'text|text|text|category|category|category'],
            ['name' => 'services', 'fields' => 1, 'fields_type' => 'category'],
            ['name' => 'portfolio', 'fields' => 1, 'fields_type' => 'category'],
            ['name' => 'team', 'fields' => 1, 'fields_type' => 'category'],
            ['name' => 'library', 'fields' => 1, 'fields_type' => 'category'],
            ['name' => 'about', 'fields' => 4, 'fields_type' => 'text|text|text|category'],
            ['name' => 'contact', 'fields' => 0, 'fields_type' => 'text|text|text|'],
            ]);
    }
}
