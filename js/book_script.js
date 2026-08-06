// -------------------------------
// 1. LOCALSTORAGE KEYS
// -------------------------------
const STORAGE_KEYS = {
    LAST_BOOK: 'gundam_last_book_idx',
    LAST_CHAPTER: (bookIdx) => `gundam_last_chapter_${bookIdx}`,
    LAST_PAGE: (bookIdx, chapterIdx) => `gundam_last_page_${bookIdx}_${chapterIdx}`,
    SCROLL_POS: (bookIdx, chapterIdx, pageIdx) => `gundam_scroll_${bookIdx}_${chapterIdx}_${pageIdx}`
};

// -------------------------------
// 2. SAVE CURRENT STATE (libro, kabanata, pahina)
// -------------------------------
function savedCurrentState() {
    localStorage.setItem(STORAGE_KEYS.LAST_BOOK, currentBookIdx);
    localStorage.setItem(STORAGE_KEYS.LAST_CHAPTER(currentBookIdx), currentChapterIdx);
    localStorage.setItem(STORAGE_KEYS.LAST_PAGE(currentBookIdx, currentChapterIdx), currentPageIdx);
}

// -------------------------------
// 3. RESTORE (para sa simula pa lang)
// -------------------------------
function restoreLastBook() {
    const savedBook = localStorage.getItem(STORAGE_KEYS.LAST_BOOK);
    if (savedBook !== null && savedBook < books.length) {
        currentBookIdx = parseInt(savedBook);
    }
    // Pagkatapos malaman ang libro, i-restore ang chapter/page nito
    restoreStateForCurrentBook();
}

// I-restore ang chapter at page para sa KASALUKUYANG libro (hindi binabago ang book index)
function restoreStateForCurrentBook() {
    const savedChapter = localStorage.getItem(STORAGE_KEYS.LAST_CHAPTER(currentBookIdx));
    if (savedChapter !== null) {
        const chap = parseInt(savedChapter);
        if (chap < books[currentBookIdx].chapters.length) currentChapterIdx = chap;
    }
    const savedPage = localStorage.getItem(STORAGE_KEYS.LAST_PAGE(currentBookIdx, currentChapterIdx));
    if (savedPage !== null) {
        const pg = parseInt(savedPage);
        const maxPage = books[currentBookIdx].chapters[currentChapterIdx].pageCount;
        if (pg < maxPage) currentPageIdx = pg;
    }
}

// -------------------------------
// 4. SCROLL POSITION (save at restore)
// -------------------------------
function savedScrollPosition() {
    const contentCard = document.querySelector('.content-card');
    if (contentCard) {
        const key = STORAGE_KEYS.SCROLL_POS(currentBookIdx, currentChapterIdx, currentPageIdx);
        localStorage.setItem(key, contentCard.scrollTop);
    }
}

function restoreScrollPosition() {
    const contentCard = document.querySelector('.content-card');
    if (!contentCard) return;
    const key = STORAGE_KEYS.SCROLL_POS(currentBookIdx, currentChapterIdx, currentPageIdx);
    const savedScroll = localStorage.getItem(key);
    if (savedScroll !== null) {
        setTimeout(() => {
            contentCard.scrollTop = parseInt(savedScroll);
        }, 50);
    }
}

// -------------------------------
// 5. DATA: MGA LIBRO (DAGDAGAN MO DITO)
// -------------------------------
const books = [
    {
        title: "Panimula sa Programming at Computer Science",
        chapters: [
            { title: "I-Introhan ko muna, Boss..!", pageCount: 4 },
            { title: "Simulan na natin to...", pageCount: 6 }/*,
            { title: "Lihim na Silid", pageCount: 1 }*/
        ]
    }/*,
    {
        title: "Ang Pakikipagsapalaran",
        chapters: [
            { title: "Simula", pageCount: 1 },
            { title: "apat", pageCount: 3 },
            { title: "Makas", pageCount: 5 }
        ]
    },
    {
        title: "Data Structure",
        chapters: [
            { title: "Spider", pageCount: 2 },
            { title: "Man", pageCount: 1 }
        ]
    }*/
];

// -------------------------------
// 6. GLOBAL VARIABLES
// -------------------------------
let currentBookIdx = 0;
let currentChapterIdx = 0;
let currentPageIdx = 0;

// DOM elements
const topNavContainer = document.getElementById('top-nav-container');
const mainContent = document.getElementById('page-content');
const chapterListEl = document.getElementById('chapter-list');
const selectedBookSpan = document.getElementById('selectedBookTitle');
const bookDropdownMenu = document.getElementById('bookDropdown');
const bookDropdownBtn = document.getElementById('bookDropdownBtn');

// -------------------------------
// 7. LOAD EXTERNAL PAGE
// -------------------------------
async function loadPage(bookIdx, chapterIdx, pageIdx) {
    const bookNum = bookIdx + 1;
    const chapterNum = chapterIdx + 1;
    const pageNum = pageIdx + 1;
    const url = `pages/book${bookNum}/chapter${chapterNum}/page${pageNum}.html`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error();
        const html = await response.text();
        mainContent.innerHTML = html;
        restoreScrollPosition();
        const contentCard = document.querySelector('.content-card');
        if (contentCard) {
            contentCard.removeEventListener('scroll', savedScrollPosition);
            contentCard.addEventListener('scroll', savedScrollPosition);
        }
    } catch (error) {
        mainContent.innerHTML = `<p style="color:red;">Hindi mabasa ang pahina: ${url}</p>`;
    }
}

// -------------------------------
// 8. RENDER TOP NAV (PAGE TABS)
// -------------------------------
function renderTopNav() {
    if (!topNavContainer) return;
    topNavContainer.innerHTML = '';
    const chapters = books[currentBookIdx].chapters;
    const currentChapter = chapters[currentChapterIdx];
    if (!currentChapter) return;
    for (let i = 0; i < currentChapter.pageCount; i++) {
        const tab = document.createElement('button');
        tab.textContent = `Phase ${i+1}`;
        if (i === currentPageIdx) tab.style.fontWeight = 'bold';
        tab.addEventListener('click', () => {
            savedScrollPosition();
            currentPageIdx = i;
            savedCurrentState();
            renderTopNav();
            loadPage(currentBookIdx, currentChapterIdx, currentPageIdx);
        });
        topNavContainer.appendChild(tab);
    }
}

// -------------------------------
// 9. RENDER CHAPTER LIST (SIDEBAR)
// -------------------------------
function renderChapterList() {
    if (!chapterListEl) return;
    chapterListEl.innerHTML = '';
    const chapters = books[currentBookIdx].chapters;
    chapters.forEach((chapter, idx) => {
        const li = document.createElement('li');
        li.textContent = chapter.title;
        if (idx === currentChapterIdx) li.style.backgroundColor = "#dbbd8c";
        li.addEventListener('click', () => {
            savedScrollPosition();
            savedCurrentState();          // i-save ang kasalukuyang estado bago umalis
            currentChapterIdx = idx;
            // Kunin ang huling page ng bagong chapter (kung mayroon)
            const savedPage = localStorage.getItem(STORAGE_KEYS.LAST_PAGE(currentBookIdx, currentChapterIdx));
            if (savedPage !== null) {
                currentPageIdx = parseInt(savedPage);
                const maxPage = books[currentBookIdx].chapters[currentChapterIdx].pageCount;
                if (currentPageIdx >= maxPage) currentPageIdx = 0;
            } else {
                currentPageIdx = 0;
            }
            savedCurrentState();          // i-save ang bagong estado
            renderChapterList();
            renderTopNav();
            loadPage(currentBookIdx, currentChapterIdx, currentPageIdx);
        });
        chapterListEl.appendChild(li);
    });
}

// -------------------------------
// 10. POPULATE BOOK DROPDOWN (MAY TAMANG RESTORE)
// -------------------------------
function populateBookDropdown() {
    if (!bookDropdownMenu) return;
    bookDropdownMenu.innerHTML = '';
    books.forEach((book, idx) => {
        const li = document.createElement('li');
        li.textContent = book.title;
        li.addEventListener('click', (e) => {
            e.stopPropagation();
            // I-save ang kasalukuyang estado bago lumipat
            savedScrollPosition();
            savedCurrentState();
            // Palitan ang libro
            currentBookIdx = idx;
            // I-restore ang huling chapter at page ng bagong libro (nang hindi binabago ang book index)
            restoreStateForCurrentBook();
            // I-update ang dropdown button text
            selectedBookSpan.textContent = `${book.title}`;
            // Isara ang dropdown
            bookDropdownMenu.classList.remove('show');
            const arrow = bookDropdownBtn.querySelector('.arrow');
            if (arrow) arrow.classList.remove('open');
            // I-refresh ang UI
            renderChapterList();
            renderTopNav();
            loadPage(currentBookIdx, currentChapterIdx, currentPageIdx);
        });
        bookDropdownMenu.appendChild(li);
    });
}

// -------------------------------
// 11. DROPDOWN TOGGLE (PAGBUKAS AT PAGSARA)
// -------------------------------
if (bookDropdownBtn && bookDropdownMenu) {
    bookDropdownBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        bookDropdownMenu.classList.toggle('show');
        const arrow = bookDropdownBtn.querySelector('.arrow');
        if (arrow) arrow.classList.toggle('open');
    });
    document.addEventListener('click', function(event) {
        if (!bookDropdownBtn.contains(event.target) && !bookDropdownMenu.contains(event.target)) {
            bookDropdownMenu.classList.remove('show');
            const arrow = bookDropdownBtn.querySelector('.arrow');
            if (arrow) arrow.classList.remove('open');
        }
    });
}

// -------------------------------
// 12. CLOCK AT MOOD ICON
// -------------------------------
function updateClock() {
    const clockSpan = document.getElementById('live-clock');
    const moodImg = document.getElementById('moodIcon');
    if (!clockSpan) return;
    
    const now = new Date();
    const hours = now.getHours();
    let moodSrc = '';
    if (hours >= 18 || hours < 6) {
        moodSrc = 'assets/image/moon.png';
    } else {
        moodSrc = 'assets/image/sun.png';
    }
    if (moodImg) moodImg.src = moodSrc;

    const optionsWeekday = { weekday: 'long' };
    const weekday = now.toLocaleDateString('en-PH', optionsWeekday);
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-PH', optionsDate);
    const timeString = now.toLocaleTimeString('en-PH', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
    clockSpan.textContent = `${weekday}, ${dateString}, ${timeString}`;
}
updateClock();
setInterval(updateClock, 1000);

// -------------------------------
// 13. SIMULAN ANG APP
// -------------------------------
populateBookDropdown();
restoreLastBook();               // <--- ito ang bagong restore (hindi restoreState)
selectedBookSpan.textContent = `${books[currentBookIdx].title}`;
renderChapterList();
renderTopNav();
loadPage(currentBookIdx, currentChapterIdx, currentPageIdx);