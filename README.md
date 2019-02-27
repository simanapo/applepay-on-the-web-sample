■前提条件

Apple Pay on the Webのテストできる条件は以下の通りです。


Apple Pay実装に必要なものが用意されていること

merchant IDに登録した認証済みドメインのみテスト可能

決算する店舗側にはSSLの導入が必須(TLS1.2)

以下のiOS・macOSバージョンであること(最新情報は公式ドキュメントを参考にしてください)

Apple Pay JS API : OS 10より最新、macOS 10.12より最新

Payment Request API : iOS 11.3 10より最新、macOS 10.1210より最新
 
https://developer.apple.com/documentation/apple_pay_on_the_web/choosing_an_api_for_implementing_apple_pay_on_your_website


■Apple Pay on the Web実装に必要なもの
・merchant ID

Apple Payに対して身元を証明する一意の識別子。
Apple Developerにログインし、Merchant IDを登録します。

・Merchant Identity Certificate

Appleとのセッションを確立するには、マーチャントID証明書が必要です。
このマーチャントID証明書はサーバにアップロードします。

作成方法

Apple Developerで「Apple Pay Merchant Identity Certificate」を作成し、ダウンロードします。その後、キーチェーンアクセスからP12ファイルを作成します。
以下コマンドより、証明書と秘密鍵ファイルをpem形式で抽出します。この2ファイルと秘密鍵ファイルで設定したパスワードは後に使用します。

$ openssl pkcs12 -in ApplePayMerchantIdentity.p12 -out ApplePay.crt.pem -clcerts -nokeys

$ openssl pkcs12 -in ApplePayMerchantIdentity.p12 -out ApplePay.key.pem -nocerts

以下のエラーが出たらRSAの公開鍵を作成し、秘密鍵作成で設定したパスワードを削除します。

unable to load client key: -8178 (SEC_ERROR_BAD_KEY)

$ openssl rsa -in ApplePay.key.pem -out ApplePayRsa.key.pem


・Sandbox環境

決済カードで取引をテストするには、ApplePayサンドボックス環境を使用します。

・テストする実機

実機でテストする場合は、Sandboxアカウントに変更する必要があります。

・デバッグ

今回はiPhone端末をテスト実機としたので、Macと接続してデバッグを行いました。
iPhone端末で、「設定」→「Safari」→「詳細」→「Webインスペクタ」を有効にします。
その後、iPhoneとMacをUSBケーブルで繋ぎ、MacのSafariから「開発」を選択肢、接続したiPhone端末を選択します。これでデバッグ準備完了です。
