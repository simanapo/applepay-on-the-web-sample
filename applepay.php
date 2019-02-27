<?php

namespace web;

class Controller_Applepay
{
    /**
     * Apple Payセッション確立
     */
    public function post_applepay_session()
    {
        \Config::load('applepay', true);

        $validation_url = $_POST['validationUrl'];

        if( "https" == parse_url($validation_url, PHP_URL_SCHEME) && substr( parse_url($validation_url, PHP_URL_HOST), -10 )  == ".apple.com" ){

            $ch = curl_init();
            $data = '{"merchantIdentifier":"' . \Config::get('applepay.merchantidentifier') . '", "domainName":"' . $_SERVER["HTTP_HOST"].'", "displayName":"' . \Config::get('applepay.display_name') . '"}';
            curl_setopt($ch, CURLOPT_URL, $validation_url);
            curl_setopt($ch, CURLOPT_SSLCERT, \Config::get('applepay.certificate_path'));
            curl_setopt($ch, CURLOPT_SSLKEY, \Config::get('applepay.certificate_key'));
            curl_setopt($ch, CURLOPT_SSLKEYPASSWD, \Config::get('applepay.certificate_key_pass'));
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

            if(curl_exec($ch) === false)
            {
                echo '{"curlError":"' . curl_error($ch) . '"}';
                \Api\Lib_LogPush::i(curl_error($ch));
            }
        }
    }
}