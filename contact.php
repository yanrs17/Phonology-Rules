<?php
$subjectPrefix = 'Derive! Contact Form';
$emailTo = 'peter.jurgec@gmail.com';

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name     = stripslashes(trim($_POST['form-name']));
    $email    = stripslashes(trim($_POST['form-email']));
    $type    = $_POST['form-type'];
    $message  = stripslashes(trim($_POST['form-message']));
    $pattern  = '/[\r\n]|Content-Type:|Bcc:|Cc:/i';

    if (preg_match($pattern, $name) || preg_match($pattern, $email) || preg_match($pattern, $type)) {
        die("Header injection detected");
    }

    $emailIsValid = preg_match('/^[^0-9][A-z0-9._%+-]+([.][A-z0-9_]+)*[@][A-z0-9_]+([.][A-z0-9_]+)*[.][A-z]{2,4}$/', $email);

    if($name && $email && $emailIsValid && $type && $message){
        $subject = "$subjectPrefix [$type]";
        $body = "Name: $name <br /> Email: $email <br /> Type: $type <br /> Comment: $message";

        $headers  = 'MIME-Version: 1.1' . PHP_EOL;
        $headers .= 'Content-type: text/html; charset=utf-8' . PHP_EOL;
        $headers .= "From: $name <$email>" . PHP_EOL;
        $headers .= "Return-Path: $emailTo" . PHP_EOL;
        $headers .= "Reply-To: $email" . PHP_EOL;
        $headers .= "X-Mailer: PHP/". phpversion() . PHP_EOL;

        mail($emailTo, $subject, $body, $headers);
        $emailSent = true;

    } else {
        $hasError = true;
    }
}
?>

<?php include('header.php'); ?> 

<div id="navbar" class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><a href="index.php">Home</a></li>
            <li><a href="about.php">About</a></li>
            <li><a href="faq.php">FAQ</a></li>
            <li class="active"><a href="contact.php">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>

<div class="container theme-showcase" role="main">

<div class="page-header">
    <h1>Contact</h1>
</div>
    <p>Please, fill out the form below and we will get back to you as soon as possible.</p>
    <p>Before reaching out to the authors of Derive!, please, consult the list of known issues <a href="http://www.jurgec.net/derive/known_issues.txt">here</a>. We would not like you to spend your time reporting an issue that we are already working on!</p>

    <?php if(!empty($emailSent)): ?>
        <div class="col-md-6 col-md-offset-3">
            <div class="alert alert-success text-center">Thank you. Your message is on its way!</div>
        </div>
    <?php else: ?>
        <?php if(!empty($hasError)): ?>
        <div class="col-md-5 col-md-offset-4">
            <div class="alert alert-danger text-center">An error occurred. Please try again!</div>
        </div>
        <?php endif; ?>

    <div class="col-md-6 col-md-offset-3">
        <form action="<?php echo $_SERVER['REQUEST_URI']; ?>" id="contact-form" class="form-horizontal" role="form" method="post">
            <div class="form-group">
                <label for="name" class="col-lg-2 control-label">Your name</label>
                <div class="col-lg-10">
                    <input type="text" class="form-control" id="form-name" name="form-name" placeholder="Name" required>
                </div>
            </div>
            <div class="form-group">
                <label for="email" class="col-lg-2 control-label">Your email</label>
                <div class="col-lg-10">
                    <input type="email" class="form-control" id="form-email" name="form-email" placeholder="Email" required>
                </div>
            </div>
            <div class="form-group">
                <label for="type" class="col-lg-2 control-label">What kind of comment would you like to make? </label>
                <div class="col-lg-10">
                    <select lass="form-type" id="form-type" name="form-type"  required>
                        <option value="suggestions for future">suggestions for future</option>
                        <option value="bugs">bugs</option>
                        <option value="instructor requests">instructor requests</option>
                        <option value="queries">queries</option>
                        <option value="other">other</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label for="message" class="col-lg-2 control-label">Your comment</label>
                <div class="col-lg-10">
                    <textarea class="form-control" rows="3" id="form-message" name="form-message" placeholder="Message" required></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="col-lg-offset-2 col-lg-10">
                    <button type="submit" class="pure-button">Submit</button>
                </div>
            </div>
        </form>
    </div>
    <?php endif; ?>
</div>

<?php include('footer.php'); ?> 