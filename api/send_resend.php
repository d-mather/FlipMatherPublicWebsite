<?php

require __DIR__ . '/vendor/autoload.php';

// Minimal Resend send() helper
function resend_send(array $toEmail, $subject='Hello World', $html='<p>Hi <strong>me</strong>!</p>') {
    $resend = Resend::client('RESEND_API_KEY_HERE');
    $resend->emails->send([
    'from' => 'Flip Mather <noreply@flipmather.co.za>',
    'to' => $toEmail,
    'reply_to' => 'flipmather@gmail.com',
    'subject' => $subject,
    'html' => $html
    ]);
}
