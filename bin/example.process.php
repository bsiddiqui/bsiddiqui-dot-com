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

ob_start();
?>
<html>
<head>
	<style type="text/css">
	</style>
</head>
<body>
	<table width="550" border="1" cellspacing="2" cellpadding="2">
		<tr bgcolor="#eeffee">
			<td>Name</td>
			<td><?=$name;?></td>
		</tr>
		<tr bgcolor="#eeeeff">
			<td>Email</td>
			<td><?=$email;?></td>
		</tr>
		<tr bgcolor="#eeffee">
			<td>message</td>
			<td><?=$message;?></td>
		</tr>
	</table>
</body>
</html>
<?
$body = ob_get_contents();

//error_reporting(E_ALL);
error_reporting(E_STRICT);

    //date_default_timezone_set('America/Toronto');

require_once('PHPMailer/class.phpmailer.php');
    //include("class.smtp.php"); // optional, gets called from within class.phpmailer.php if not already loaded

$mail = new PHPMailer();


$mail->IsSMTP(); // telling the class to use SMTP
    $mail->SMTPDebug  = 2;                     // enables SMTP debug information (for testing)
                                               // 1 = errors and messages
                                               // 2 = messages only
    $mail->SMTPAuth   = true;                  // enable SMTP authentication
    $mail->SMTPSecure = "tls";                 // sets the prefix to the servier
    $mail->Host       = "smtp.gmail.com";      // sets GMAIL as the SMTP server
    $mail->Port       = 587;                   // set the SMTP port for the GMAIL server
    $mail->Username   = "example@gmail.com";  // GMAIL username
    $mail->Password   = "examplePassword";            // GMAIL password

    $mail->SetFrom('example@gmail.com', 'Example Bot');

    $mail->AddReplyTo($name, $email);

    $mail->Subject = "Contact Form: Personal Website";

    $mail->MsgHTML($body);

    $address = "example@gmail.com";
    $mail->AddAddress($address, "Recipient Name");


    if(!$mail->Send()) {
    	echo "Mailer Error: " . $mail->ErrorInfo;
    } else {
    	echo "Message sent!";
    }

    ?>
