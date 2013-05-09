<? php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    $to      = "basil.siddiqui@gmail.com";
    $subject = "Someone contacted you!"
    $message = $name . " | " . $email . "\n\n" . $message;
    $headers = "From: bsiddiqu.com";

    mail($to, $subject, $message, $headers);
?>
