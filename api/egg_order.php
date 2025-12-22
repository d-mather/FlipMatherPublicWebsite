<?php
// include 'send_resend.php';

function e($value) {
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

try {
    $data = body();
    $name     = e($data['name'] ?? '');
    $phone    = e($data['phone'] ?? '');
    $quantity = e($data['quantity'] ?? '');
    $notes    = e($data['notes'] ?? '');

    if (!$name || !$phone || !$quantity) {
        json(['error' => 'Required details are required'], 400);
    }

    $email = ['dillmath24@gmail.com', 'ellielliott55@gmail.com', 'rosselliott916@gmail.com'];
    $emailBody = "
        <p>
        New egg order from {$name}<br />
        Phone number: {$phone}<br />
        Quantity: {$quantity} (remember to deduct the free eggs from the account)<br />
        Order notes: \"{$notes}\"
        </p>";

    // Send order email
    resend_send($email, "Egg order - Flip Mather", $emailBody);

    json(['success' => true]);
} catch (Exception $ex) {
    error_log($ex->getMessage());
    json(['error'=>$ex->getMessage()], 422);
}
