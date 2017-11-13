<?php
return [
    'superadmins' => [
        'mahmod@gmail.com',
    ],
    'menu' => [
        [
            'icon' => 'envelope',
            'title' => 'Inbox',
            'items' => [
                [
                    'text' => 'Inbox',
                    'link' => '/inbox',
                ],
            ]
        ],
        [
            'icon' => 'file-text',
            'title' => 'Pages',
            'items' => [
                [
                    'text' => 'Pages List',
                    'link' => '/pages',
                ],
                [
                    'text' => 'Create Page',
                    'link' => '/pages/create',
                ],
            ]
        ],
        [
            'icon' => 'bars',
            'title' => 'Navigation',
            'items' => [
                [
                    'text' => 'Navigation',
                    'link' => '/nav',
                ],
            ]
        ],
    ]
];