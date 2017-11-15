<?php

use Illuminate\Database\Seeder;

class SuperAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (config('mahacms.superadmins') as $email) {
            # code...
            DB::table('users')->insert([
                'name' => 'Mahmod',
                'email' => $email,
                'password' => bcrypt('500505')
            ]);
        }
    }
}
