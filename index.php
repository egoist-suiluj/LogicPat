<?php
    ini_set('session.cookie_lifetime', 0);
    session_start();
    if(!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
        header('Location: login.php');
        exit;
    }
?>

<!DOCTYPE html>
<html lang="tl" translate="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="google" content="notranslate">
    <title>LogicPat | Learn D'Logic Before D'Code</title>
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="assets/image/LogicPat-browser-icon.png">
</head>
<body>
<!-- Hamburger button (para sa mobile) -->
    <div class="hamburger" id="hamburgerBtn">
        <span></span>
        <span></span>
        <span></span>
    </div>
    <div class="app">
        <!--Side Navigation-->
        <aside class="sidebar" id="sidebar">
            <div class="branding">
                <div class="logo-image">
                    <img src="assets/image/LogicPat-brand.png" alt="LOGICPAT">
                <p class="tagline">Learn D'Logic Before D'Code</p>
                </div>
            </div>

            <!--DROPDOWN PARA SA PAMAGAT NG LIBRO-->
            <div class="dropdown-container" title="Pindutin ang drop-down para pumili ng aaralin">
                <button id="bookDropdownBtn" class="dropdown-btn">
                    <span id="selectedBookTitle">📚 Pumili ng libro</span>
                    <span class="arrow">▼</span>
                </button>
                <ul id="bookDropdown" class="dropdown-menu">
                    <!--Dito lalagay ang mga pamagat ng libro-->
                </ul>
            </div>
            <nav>
                <ul id="chapter-list">
                    <!--Dito lalagay ang mga babasahin-->
                </ul>
            </nav>
            <div class="sidebar-footer">
                <p>Never stop learning</p>
                <a href="logout.php" class="power-off" title="Disconnect Pilot Link" style="color: #0ef; text-decoration:none; font: size 0.7rem;">[→] Logout</a>
            </div>
        </aside>

        <!--Main screen area-->
        <main class="main-area">
            <header class="main-header">
                <div class="brand">
                    Quell the flames in your mind...
                    <span style="font-size: 0.8rem; display: block;;">And take over the river within you.</span>
                </div>
                <div class="clock">
                    <span id="live-clock"></span>
                    <img id="moodIcon" src="assets/image/sun.png" alt="mood" style="width: 24px; height: 24px; margin-left: 8px;">
                </div>
            </header>

            <!--Top navigation para sa pages-->
            <div class="top-nav" id="top-nav-container"></div>

            <!--Pages content-->
            <div class="content-card" id="page-content">
                <p>Pumili ng kabanata at pahina</p>
            </div>
        </main>
    </div>

<script src="js/book_script.js"></script>
<script src="js/mobile.js"></script>
</body>
</html>