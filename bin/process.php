<?php
if ((isset($_POST['name'])) && (strlen(trim($_POST['name'])) > 0)) {
	$name = stripslashes(strip_tags($_POST['name']));
} else {$name = 'No name entered';}
if ((isset($_POST['email'])) && (strlen(trim($_POST['email'])) > 0)) {
	$email = stripslashes(strip_tags($_POST['email']));
} else {$email = 'No email entered';}
if ((isset($_POST['message'])) && (strlen(trim($_POST['message'])) > 0)) {
	$message = stripslashes(strip_tags($_POST['message']));
} else {$message = 'No message entered';}

$to      = "basil.siddiqui@gmail.com";
$subject = "A message for you! :)";
$message = $name . " | " . $email . "\n\n" . $message;
$headers = "From: basil.siddiqui@gmail.com";

mail($to, $subject, $message, $headers);
?>
