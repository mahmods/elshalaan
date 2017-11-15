<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('settings')->insert([
            ['setting_name' => 'appname', 'setting_value' => "مؤسسة شعلان"],
            ['setting_name' => 'appdesc', 'setting_value' => "Just another MahaCMS site"],
            ['setting_name' => 'email1', 'setting_value' => "info@el-shalaan.com"],
            ['setting_name' => 'email2', 'setting_value' => "HR@Alshaalah.com"],
            ['setting_name' => 'phone1', 'setting_value' => "0020102598532158"],
            ['setting_name' => 'phone2', 'setting_value' => "0565231230456946"],
            ['setting_name' => 'work_days', 'setting_value' => "السبت - الخميس"],
            ['setting_name' => 'work_hours', 'setting_value' => "9:00ص - 5:00م"],
            ['setting_name' => 'address', 'setting_value' => "9 ش ابو بكر الصديق – ارض الحريه )"],
            ['setting_name' => 'address1', 'setting_value' => "المركز الرئيسي للشركة ( القاهرة )"],
            ['setting_name' => 'address2', 'setting_value' => "فروع الشركة ( بني سويف ) )"],
            ['setting_name' => 'address3', 'setting_value' => "فروع تحت التأسيس ( اسكندرية – أسيوط ) )"],
            ]);
    }
}
