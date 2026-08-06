<?php
ini_set('session.cookie_lifetime', 0);
session_start();
// Kung naka-login na, diretso sa book app
if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
    header('Location: index.php');
    exit;
}

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require_once 'config.php';
    $username = trim($_POST['username']);
    $password = $_POST['password'];
    
    if (!empty($username) && !empty($password)) {
        $stmt = $conn->prepare("SELECT id, username, password_hash FROM users WHERE username = ?");

    if (!$stmt) {
    die("Prepare failed: " . $conn->error);
    }
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($row = $result->fetch_assoc()) {
            if (password_verify($password, $row['password_hash'])) {
            session_regenerate_id(true);

                $_SESSION['user_id'] = $row['id'];
                $_SESSION['username'] = $row['username'];
                $_SESSION['logged_in'] = true;
                header('Location: index.php');
                exit;
            } else {
                $error = 'Maling password.';
            }
        } else {
            $error = 'Username hindi mahanap.';
        }
        $stmt->close();
    } else {
        $error = 'Punan ang lahat ng field.';
    }
    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="tl" translate="no">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" content="notranslate">
    <title>LogicPat | Learn D'Logic Before D'Code</title>
    <link rel="stylesheet" href="login_style.css">
    <link rel="icon" href="assets/image/LogicPat-browser-icon.png">
</head>
<body>
<div class="container">
    <div class="login-box">
        <h2>LogicPat</h2>

        <form method="POST" action="">
            <div class="input-box">
                <input type="text" name="username" required autocomplete="off">
                <label>Username</label>
            </div>
            <div class="input-box">
                <input type="password" name="password" required>
                <label>Password</label>
            </div>
            <div class="forgot-pass">
                <a href="#">By your hands you cannot break our clasp, that power lies in another grasp</a>
            </div>
            <button type="submit" class="btn">Login</button>
            <div class="signup-link">
                <a href="#">Made with ❤️ by Jwu</a>
            </div>
        </form>
    </div>

    <span style="--i:0;"></span>
    <span style="--i:1;"></span>
    <span style="--i:2;"></span>
    <span style="--i:3;"></span>
    <span style="--i:4;"></span>
    <span style="--i:5;"></span>
    <span style="--i:6;"></span>
    <span style="--i:7;"></span>
    <span style="--i:8;"></span>
    <span style="--i:9;"></span>
    <span style="--i:10;"></span>
    <span style="--i:11;"></span>
    <span style="--i:12;"></span>
    <span style="--i:13;"></span>
    <span style="--i:14;"></span>
    <span style="--i:15;"></span>
    <span style="--i:16;"></span>
    <span style="--i:17;"></span>
    <span style="--i:18;"></span>
    <span style="--i:19;"></span>
    <span style="--i:20;"></span>
    <span style="--i:21;"></span>
    <span style="--i:22;"></span>
    <span style="--i:23;"></span>
    <span style="--i:24;"></span>
    <span style="--i:25;"></span>
    <span style="--i:26;"></span>
    <span style="--i:27;"></span>
    <span style="--i:28;"></span>
    <span style="--i:29;"></span>
    <span style="--i:30;"></span>
    <span style="--i:31;"></span>
    <span style="--i:32;"></span>
    <span style="--i:33;"></span>
    <span style="--i:34;"></span>
    <span style="--i:35;"></span>
    <span style="--i:36;"></span>
    <span style="--i:37;"></span>
    <span style="--i:38;"></span>
    <span style="--i:39;"></span>
    <span style="--i:40;"></span>
    <span style="--i:41;"></span>
    <span style="--i:42;"></span>
    <span style="--i:43;"></span>
    <span style="--i:44;"></span>
    <span style="--i:45;"></span>
    <span style="--i:46;"></span>
    <span style="--i:47;"></span>
    <span style="--i:48;"></span>
    <span style="--i:49;"></span>

</div>

<?php if ($error): ?>
<script>
    const errorMsg = "<?php echo htmlspecialchars($error); ?>";
</script>
<script src="js/login_notif.js"></script>
<?php endif; ?>


</body>
</html>