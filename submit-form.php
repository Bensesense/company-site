<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Define the fallback function
function sendMailFallback($to, $subject, $message, $from) {
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    return mail($to, $subject, $message, $headers);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_var(trim($_POST["name"] ?? ''), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
    $interest = filter_var(trim($_POST["interest"] ?? ''), FILTER_SANITIZE_STRING);

    if (empty($name) || empty($email) || empty($interest) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["success" => false, "message" => "Bitte füllen Sie alle Felder korrekt aus."]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        // Your existing PHPMailer setup code here
        $mail->isSMTP();
        $mail->Host       = 'smtp_host'; //enter your smtp host here
        $mail->SMTPAuth   = true;
        $mail->Username   = 'your_email'; //enter your email here
        $mail->Password   = 'smtp_password'; //enter your password here
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; 
        $mail->Port       = 465; 

        $mail->setFrom('your@mail.com', 'heading'); //add your mail and heading
        $mail->addAddress('your@mail.com'); //add your mail
        $mail->addReplyTo($email, $name);

        $mail->isHTML(false);
        $mail->Subject = "Neue Kontaktformular-Anfrage von $name";
        $mail->Body    = "Name: $name\nEmail: $email\n\nInteresse:\n$interest";

        // Try to send using PHPMailer
        if ($mail->send()) {
            echo json_encode(["success" => true, "message" => "Vielen Dank für Ihre Anfrage. Wir werden uns bald bei Ihnen melden."]);
        } else {
            throw new Exception("PHPMailer failed to send");
        }
    } catch (Exception $e) {
        // If PHPMailer fails, try the fallback method
        if (sendMailFallback('your@mail', $mail->Subject, $mail->Body, $email)) { //add your mail here
            echo json_encode(["success" => true, "message" => "Vielen Dank für Ihre Anfrage. Wir werden uns bald bei Ihnen melden."]);
        } else {
            echo json_encode([
                "success" => false, 
                "message" => "Es gab einen Fehler beim Senden Ihrer Anfrage. Bitte versuchen Sie es später erneut.", 
                "debug_info" => $mail->ErrorInfo . " Fallback also failed."
            ]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "Ungültige Anfragemethode."]);
}
?>