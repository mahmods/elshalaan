<?php

use Faker\Generator as Faker;

/* @var Illuminate\Database\Eloquent\Factory $factory */

$factory->define(MahaCMS\Blog\Models\Post::class, function (Faker $faker) {
    $category_id = $faker->numberBetween($min = 1, $max = 4);
    switch ($category_id) {
        case 1: //خدماتنا
            return [
                'title' => $faker->catchPhrase,
                'description' => $faker->bs,
                'content' => $faker->text(400),
                'image' => 'icon'.$faker->numberBetween(1,12).'.png',
                'category_id' => 1,
                'user_id' => 1
            ];
            break;
        case 2: //سابقة أعمالنا
            return [
                'title' => $faker->catchPhrase,
                'description' => $faker->bs,
                'content' => $faker->text(400),
                'image' => 'portfolio'.$faker->numberBetween(1,23).'.jpg',
                'category_id' => 2,
                'user_id' => 1
            ];
            break;
        case 3: //فريق العمل
            return [
                'title' => $faker->name,
                'description' => $faker->bs,
                'content' => $faker->text(400),
                'image' => 'team'.$faker->numberBetween(1,3).'.png',
                'category_id' => 3,
                'user_id' => 1
            ];
            break;
        case 4: //المكتبة
            return [
                'title' => $faker->sentence,
                'description' => $faker->bs,
                'content' => '<p>'.$faker->text(1000).'</p>',
                'image' => 'portfolio'.$faker->numberBetween(1,23).'.jpg',
                'category_id' => 4,
                'user_id' => 1
            ];
            break;
    }    
});
