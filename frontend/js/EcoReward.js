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
    renderActivities();
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
// ===============================
// 🏷️ TAB SWITCHING: ALL vs LOCKED
// ===============================
const tabAll = document.getElementById("tabAll");
const tabLocked = document.getElementById("tabLocked");

tabAll.addEventListener("click", () => {
    showBadges("all");
    tabAll.classList.add("bg-primary", "text-slate-900");
    tabLocked.classList.remove("bg-primary", "text-slate-900");
});

tabLocked.addEventListener("click", () => {
    showBadges("locked");
    tabLocked.classList.add("bg-primary", "text-slate-900");
    tabAll.classList.remove("bg-primary", "text-slate-900");
});

// ===============================
// 🔹 SHOW BADGES FUNCTION
// ===============================
function showBadges(filter) {
    const points = parseInt(localStorage.getItem("points")) || 0;

    achievements.forEach(a => {
        const el = document.getElementById("badge-" + a.id);
        if (!el) return;

        if (filter === "all") {
            el.classList.remove("hidden");
        } else if (filter === "locked") {
            // Show only if badge is locked
            if (points < a.points) {
                el.classList.remove("hidden");
            } else {
                el.classList.add("hidden");
            }
        }
    });
}
function renderActivities() {
    const activityContainer = document.getElementById("activityList");
    const activities = JSON.parse(localStorage.getItem("activities")) || [];

    activityContainer.innerHTML = ""; // Clear old content

    activities.forEach(a => {
        const div = document.createElement("div");
        div.className = "group flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-all border border-transparent hover:border-emerald-100 dark:hover:border-emerald-500/20";

        div.innerHTML = `
        <div class="size-12 flex items-center justify-center bg-emerald-500/20 text-emerald-600 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <span class="material-symbols-outlined font-fill">local_drink</span>
        </div>
        <div class="flex-1">
            <p class="text-sm font-black">${a.action}</p>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">${a.time}</p>
        </div>
        <div class="text-right">
            <p class="text-sm font-black text-emerald-500">+${a.points} pts</p>
        </div>
        `;

        activityContainer.appendChild(div);
    });
}
function openProfileModal() {
    const modal = document.getElementById("profileModal");
    const card = document.getElementById("profileModalCard");

    // Update dynamic content (optional, if you want real points/level)
    const points = parseInt(localStorage.getItem("points")) || 0;
    const level = Math.floor(points / 200);

    document.getElementById("profilePoints").innerText = points;
    document.getElementById("profileLevel").innerText = level;

    modal.classList.remove("hidden");
    setTimeout(() => {
        card.classList.remove("scale-90", "opacity-0");
        card.classList.add("scale-100", "opacity-100");
    }, 50);
}

function closeProfile() {
    const modal = document.getElementById("profileModal");
    const card = document.getElementById("profileModalCard");

    card.classList.remove("scale-100", "opacity-100");
    card.classList.add("scale-90", "opacity-0");

    setTimeout(() => {
        modal.classList.add("hidden");
    }, 200);
}
const leaderboardItems = document.querySelectorAll(".leaderboard-item"); // add this class to leaderboard rows

leaderboardItems.forEach(item => {
    item.addEventListener("click", () => {
        const username = item.querySelector("p").innerText;
        alert(username + " profile clicked!");
        // Or open a modal with their stats
    });
});
// Modal elements
const userModal = document.getElementById("userModal");
const modalAvatar = document.getElementById("modalAvatar");
const modalName = document.getElementById("modalName");
const modalTitle = document.getElementById("modalTitle");
const modalPoints = document.getElementById("modalPoints");
const modalLevel = document.getElementById("modalLevel");

// Sample data for leaderboard
const leaderboardUsers = {
  1: {
    name: "Sarah Jenkins",
    title: "Platinum Recycler",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAz5he9Klqvivakmbf9ow5YhJc_OVnrYP85iTVzcWRd-aLzIXgBRr2wRhONInx5tbW-0czivphYK8Y9j-wbUfEQ3QQJU7iWJYebLhFuOwqZB1RQh2PoGMjduXKpvxUWDB8_-dCVBHeZlVAXfK1jsIAloIJp4LXVUbBqkIRc41a4MpDgona1G1h5SBEejdNUMK7GPTZogRciqeWi1Xc3yoziLPgmZHEBzLyK9-IOGuamWsD_vA3jNvXi9d4xfAKmqC95oe9mlk6PiY",
    points: "18,200",
    level: "20"
  },
  2: {
    name: "Marcus Chen",
    title: "Gold Recycler",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOUDFiBAp6f90tCI25RDj-yCUcUH8V739bI6ilwSSUwEjbRaZH0BEMD0mMFWK-n6Hrf3Ku3chBaIvcUoS1QSQwarspdj0AVywN6AbLUFJyN2_1dQtdFBbYU7Q76irJgYEwvY_Uq1riciUX7h6qWbL7aPYzUgRWzWMzrTLnvVxxKP2LbQFcYiSgEj-zxW0ZLx9224GFTEP0TnKB84OuAPjRsKB-K5OpudnyIqkZqOfWGfpixzKT26dfXKpUiDY42JqO27Ii0dlk5U4",
    points: "15,900",
    level: "18"
  },
  3: {
    name: "Elena Rodriguez",
    title: "Silver Recycler",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_TlJu-u1eCY_vpVcmlJUkdUNzTBMqrynvfCESpfaqoCpfxTzYkpwRsE_G551eFUDFR5qsP03uQckHJ7u6G57Smal1XkBPZX1FDwYCGvlNXFi9e1RzJGl7C5_XTQC3sPdmSvDVBOOOOfbIDvyuHjqC_0oTNJdBPaMZ4986zgP6d8xOQEnFFWEF0LSRKuQ0HYGodt5Dty0S5Vo-fiN3HhaxXDKDIPawMuUVkVwGpaT7HQTqMa_7ZEZAe4rgFqoxVqOaxp7EsJTngvI",
    points: "14,100",
    level: "16"
  }
};

// ===============================
// 🔹 BADGE MODAL
// ===============================
function openBadge(id) {
    const badge = achievements.find(a => a.id === id);
    if (!badge) return;

    const modal = document.getElementById("badgeModal");
    const card = document.getElementById("modalCard");

    document.getElementById("modalTitle").innerText = badge.title;
    document.getElementById("modalIcon").innerHTML = `<span class="material-symbols-outlined">${getBadgeIcon(id)}</span>`;
    document.getElementById("modalDesc").innerText = badge.desc + " 🎉 Unlocked!";
    document.getElementById("progressBar").style.width = "100%";
    const points = parseInt(localStorage.getItem("points")) || 0;
    document.getElementById("progressText").innerText = `${points} / ${badge.points} points`;

    modal.classList.remove("hidden");
    setTimeout(() => card.classList.remove("scale-90", "opacity-0"), 50);
}

function closeBadgeModal() {
    const modal = document.getElementById("badgeModal");
    const card = document.getElementById("modalCard");

    card.classList.add("scale-90", "opacity-0");
    setTimeout(() => modal.classList.add("hidden"), 200);
}

// ===============================
// 🔹 USER MODAL (Leaderboard/Profile)
// ===============================
function openUserModal(userId) {
    const user = leaderboardUsers[userId];
    const modal = document.getElementById("userModal");
    const card = modal.firstElementChild;

    modalAvatar.style.backgroundImage = `url('${user.avatar}')`;
    modalName.textContent = user.name;
    modalTitle.textContent = user.title;
    modalPoints.textContent = user.points;
    modalLevel.textContent = user.level;

    modal.classList.remove("hidden");
    setTimeout(() => card.classList.remove("scale-90", "opacity-0"), 50);
}

function closeUserModal() {
    const modal = document.getElementById("userModal");
    const card = modal.firstElementChild;

    card.classList.add("scale-90", "opacity-0");
    setTimeout(() => modal.classList.add("hidden"), 200);
}

// ===============================
// Attach click events
// ===============================
document.querySelectorAll(".leaderboard-item").forEach((el, i) => {
    el.addEventListener("click", () => openUserModal(i + 1));
});