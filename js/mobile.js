// mobile.js - may condition: chapter close, book stay open
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    if (!hamburger || !sidebar) return;
    
    function closeMenu() {
        sidebar.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    }
    
    function openMenu() {
        sidebar.classList.add('open');
        hamburger.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    
    hamburger.onclick = function(e) {
        e.stopPropagation();
        if (sidebar.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    };
    
    // Isara ang menu kapag pumili ng CHAPTER (hindi libro)
    document.body.addEventListener('click', function(e) {
        // Kung ang na-click ay chapter (o ang anak nito)
        const chapterItem = e.target.closest('#chapter-list li');
        if (chapterItem && window.innerWidth <= 767) {
            closeMenu();  // magsasara ang sidebar
        }
        // Kung ang na-click ay libro (dropdown), huwag isara
        const bookItem = e.target.closest('#bookDropdown li');
        if (bookItem) {
            // Huwag isara, hayaan lang
            return;
        }
    });
    
    // Opsyonal: Isara rin kapag nag-click sa labas ng sidebar (sa main content)
    document.body.addEventListener('click', function(e) {
        if (window.innerWidth <= 767 && sidebar.classList.contains('open')) {
            // Kung ang click ay hindi sa sidebar at hindi sa hamburger
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                closeMenu();
            }
        }
    });
});