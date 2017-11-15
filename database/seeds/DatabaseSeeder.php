<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //$this->call(SuperAdminSeeder::class);
        //$this->call(CategoriesTableSeeder::class);
        //$this->call(PostsTableSeeder::class);
        //$this->call(PagesTableSeeder::class);
        $this->call(NavTableSeeder::class);
        //$this->call(SettingsTableSeeder::class);
        //$this->call(TemplatesTableSeeder::class);
    }
}
