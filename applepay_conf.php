<?php

return [
    // マーチャント証明書・パスフレーズ
    'certificate_key'      => '/var/www/html/ApplePay.key.pem',
    'certificate_path'     => '/var/www/html/ApplePay.crt.pem',
    'certificate_key_pass' => 'password',

    // マーチャントID
    'merchantidentifier' => 'merchant.sample',

    // 使用する通貨・国
    'currency_code' => 'JPY',
    'country_code'  => 'JP',
    'display_name'  => 'Sample',
];
