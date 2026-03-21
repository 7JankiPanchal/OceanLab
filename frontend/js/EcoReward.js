// ===============================
// 🎯 ACHIEVEMENTS
// ===============================
const achievements = [
    { id: 1, title: "Green Starter", desc: "Recycled 10 items", points: 100 },
    { id: 2, title: "Ocean Savior", desc: "50 plastic bottles", points: 300 },
    { id: 3, title: "Sorting Pro", desc: "Zero contamination", points: 600 },
    { id: 4, title: "Tree Planter", desc: "Reached 1000 eco points", points: 1000 },
    { id: 5, title: "Weekly Streak", desc: "7 days active", points: 1500 },
    { id: 6, title: "Earth Master", desc: "Level 20 unlock", points: 2000 },
    { id: 7, title: "Aluminum King", desc: "100 cans sorted", points: 2500 },
    { id: 8, title: "Compost Expert", desc: "20kg bio waste", points: 3000 }
];

// ===============================
// 🚀 INIT
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    // 🔥 FORCE UNLOCK ALL BADGES (FOR TESTING)
    localStorage.setItem("points", 10000);

    renderBadges();
    initNavbar();
    loadNotifications();
});

// ===============================
// 🏅 LOCK + UNLOCK SYSTEM
// ===============================
function renderBadges() {
    let points = parseInt(localStorage.getItem("points")) || 0;

    achievements.forEach(a => {
        const el = document.getElementById("badge-" + a.id);
        if (!el) return;

        // ✅ ALL UNLOCKED LOOK
        el.classList.remove("opacity-40", "grayscale");

        // Optional glow effect
        el.classList.add("ring-2", "ring-primary/30");
    });
}

// ===============================
// 🎯 ICON HELPER
// ===============================
function getBadgeIcon(id) {
    const icons = {
        1: "eco",
        2: "water_drop",
        3: "auto_awesome",
        4: "forest",
        5: "electric_bolt",
        6: "stars",
        7: "workspace_premium",
        8: "compost"
    };
    return icons[id] || "emoji_events";
}

// ===============================
// 🔍 MODAL OPEN
// ===============================
function openBadge(id) {
    let points = parseInt(localStorage.getItem("points")) || 0;
    const badge = achievements.find(a => a.id === id);

    if (!badge) return;

    document.getElementById("modalTitle").innerText = badge.title;

    document.getElementById("modalIcon").innerHTML =
        `<span class="material-symbols-outlined">${getBadgeIcon(id)}</span>`;

    document.getElementById("modalDesc").innerText =
        badge.desc + " 🎉 Unlocked!";

    document.getElementById("progressBar").style.width = "100%";

    document.getElementById("progressText").innerText =
        `${points} / ${badge.points} points`;

    const modal = document.getElementById("badgeModal");
    const card = document.getElementById("modalCard");

    modal.classList.remove("hidden");

    setTimeout(() => {
        card.classList.remove("scale-90", "opacity-0");
        card.classList.add("scale-100", "opacity-100");
    }, 50);
}

// ===============================
// ❌ CLOSE MODAL
// ===============================
function closeModal() {
    const modal = document.getElementById("badgeModal");
    const card = document.getElementById("modalCard");

    card.classList.remove("scale-100", "opacity-100");
    card.classList.add("scale-90", "opacity-0");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 200);
}

// ===============================
// ➕ ADD POINTS
// ===============================
function updatePoints(amount = 50) {
    let points = parseInt(localStorage.getItem("points")) || 0;

    points += amount;
    localStorage.setItem("points", points);

    addActivity("Recycled waste", amount);
    renderBadges();
}

// ===============================
// 📜 ACTIVITY SYSTEM
// ===============================
function addActivity(action, pts) {
    let activities = JSON.parse(localStorage.getItem("activities")) || [];

    activities.unshift({
        action: action,
        points: pts,
        time: new Date().toLocaleString()
    });

    activities = activities.slice(0, 10);
    localStorage.setItem("activities", JSON.stringify(activities));
}

// ===============================
// 🔔 NAVBAR (FIXED)
// ===============================
function initNavbar() {

    const notifBtn = document.getElementById("notifBtn");
    const notifDropdown = document.getElementById("notifDropdown");

    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown = document.getElementById("profileDropdown");

    if (!notifBtn || !profileBtn) return;

    notifBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle("hidden");
        profileDropdown.classList.add("hidden");
    });

    profileBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle("hidden");
        notifDropdown.classList.add("hidden");
    });

    document.addEventListener("click", () => {
        notifDropdown.classList.add("hidden");
        profileDropdown.classList.add("hidden");
    });
}

// ===============================
// 🔔 NOTIFICATIONS
// ===============================
function loadNotifications() {
    const notifList = document.getElementById("notifList");
    const notifBadge = document.getElementById("notifBadge");

    if (!notifList || !notifBadge) return;

    let notifications = [
        "You earned 50 points 🎉",
        "New badge unlocked 🏆",
        "Recycling streak updated 🔥"
    ];

    notifList.innerHTML = "";

    notifications.forEach(n => {
        const p = document.createElement("p");
        p.textContent = n;
        p.className = "p-2 rounded hover:bg-primary/10 cursor-pointer";
        notifList.appendChild(p);
    });

    notifBadge.textContent = notifications.length;
    notifBadge.classList.remove("hidden");
}

// ===============================
// 🚪 LOGOUT
// ===============================
function logout() {
    alert("Logging out...");
}