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
                    'permission'=> "inbox.access",
                    'text' => 'Inbox',
                    'link' => '/inbox',
                ],
            ]
        ],
        [
            'icon' => 'bars',
            'title' => 'Navigation',
            'items' => [
                [
                    'permission'=> "navigation.manage",
                    'text' => 'Navigation',
                    'link' => '/nav',
                ],
            ]
        ],
    ]
];