<?php
    $data = $_POST['text'];
    // $to      = 'snolly.gv@gmail.com';
    $to      = 'hello@termo.land';
    $subject = 'TERMOLAND';
    $message = '' . $data;
    $headers = 'From: termo.land';
    mail($to, $subject, $message, $headers);
?> 