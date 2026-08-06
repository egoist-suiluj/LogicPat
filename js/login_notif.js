if (typeof errorMsg !== "undefined") {
    const notif = document.createElement("div");
    notif.innerText = errorMsg;

    // ✅ POSITION (IMPORTANT 🔥)
    notif.style.position = "fixed";
    notif.style.top = "20px";
    notif.style.right = "20px";

    // ✅ DESIGN (yung ginawa mo)
    notif.style.background = "rgba(255, 77, 77, 0.85)";
    notif.style.backdropFilter = "blur(10px)";
    notif.style.border = "1px solid rgba(255,255,255,0.2)";
    notif.style.color = "#fff";
    notif.style.padding = "12px 20px";
    notif.style.borderRadius = "12px";
    notif.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
    notif.style.fontWeight = "500";

    // ✅ IMPORTANT: ilalagay AFTER ng styles
    document.body.appendChild(notif);

    // auto remove after 3 sec
    setTimeout(() => {
        notif.remove();
    }, 3000);
}