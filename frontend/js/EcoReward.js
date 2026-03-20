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
// 🚀 INIT (IMPORTANT FIX)
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    // Initialize points if not present
    if (!localStorage.getItem("points")) {
        localStorage.setItem("points", 0);
    }

    renderBadges();
});

// ===============================
// 🏅 LOCK + UNLOCK SYSTEM
// ===============================
function renderBadges() {
    let points = parseInt(localStorage.getItem("points")) || 0;

    achievements.forEach(a => {
        const el = document.getElementById("badge-" + a.id);
        if (!el) return;

        if (points < a.points) {
            el.classList.add("opacity-40", "grayscale");
        } else {

            // Unlock animation (NEW 🔥)
            if (el.classList.contains("grayscale")) {
                el.classList.remove("opacity-40", "grayscale");

                el.classList.add("ring-4", "ring-primary");

                setTimeout(() => {
                    el.classList.remove("ring-4", "ring-primary");
                }, 1000);
            }
        }
    });
}

// ===============================
// 🎯 ICON HELPER (FIXED)
// ===============================
function getBadgeIcon(id) {
    const icons = {
        1: "eco",
        2: "water_drop",
        3: "auto_awesome",
        4: "forest",
        5: "electric_bolt", // FIXED
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

    let progress = Math.min((points / badge.points) * 100, 100);

    if (points >= badge.points) {
        document.getElementById("modalDesc").innerText =
            badge.desc + " 🎉 Unlocked!";
    } else {
        document.getElementById("modalDesc").innerText =
            `🔒 Locked - Need ${badge.points} points`;
    }

    document.getElementById("progressBar").style.width = progress + "%";

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
// 📜 ACTIVITY SYSTEM (IMPROVED)
// ===============================
function addActivity(action, pts) {
    let activities = JSON.parse(localStorage.getItem("activities")) || [];

    activities.unshift({
        action: action,
        points: pts,
        time: new Date().toLocaleString()
    });

    // Keep only last 10 activities
    activities = activities.slice(0, 10);

    localStorage.setItem("activities", JSON.stringify(activities));
}

// ===============================
// 👤 PROFILE
// ===============================
function openProfile() {
    let points = parseInt(localStorage.getItem("points")) || 0;
    let level = Math.floor(points / 200);

    const p = document.getElementById("profilePoints");
    const l = document.getElementById("profileLevel");

    if (p) p.innerText = "Points: " + points;
    if (l) l.innerText = "Level: " + level;

    document.getElementById("profileModal").classList.remove("hidden");
}

function closeProfile() {
    document.getElementById("profileModal").classList.add("hidden");
}