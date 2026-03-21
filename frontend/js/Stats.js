document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // ELEMENTS
    // ==========================
    const notifBtn = document.getElementById("notifBtn");
    const notifDropdown = document.getElementById("notifDropdown");

    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown = document.getElementById("profileDropdown");

    const filterBtn = document.getElementById("filterBtn");
    const exportBtn = document.getElementById("exportBtn");
    const datePicker = document.getElementById("datePicker");

    const modal = document.getElementById("infoModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalContent = document.getElementById("modalContent");
    const closeModal = document.getElementById("closeModal");

    const notifList = document.getElementById("notifList");
    const badge = document.getElementById("notifBadge");

    // ==========================
    // STATS DATA
    // ==========================
    const stats = {
        waste: 1240,
        carbon: 450,
        community: 12
    };

    // ==========================
    // DROPDOWNS
    // ==========================
    notifBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        notifDropdown.classList.toggle("hidden");
        profileDropdown.classList.add("hidden");
        badge.classList.add("hidden");
    });

    profileBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle("hidden");
        notifDropdown.classList.add("hidden");
    });

    document.addEventListener("click", () => {
        notifDropdown.classList.add("hidden");
        profileDropdown.classList.add("hidden");
    });

    // ==========================
    // NOTIFICATIONS
    // ==========================
    function addNotification(message) {
        if (notifList.textContent === "No notifications") {
            notifList.innerHTML = "";
        }

        const div = document.createElement("div");
        div.className = "p-2 bg-slate-100 dark:bg-slate-800 rounded-md text-sm";
        div.textContent = message;

        notifList.prepend(div);

        badge.textContent = notifList.childElementCount;
        badge.classList.remove("hidden");
    }

    addNotification("You collected 5kg of plastic today!");

    // ==========================
    // DATE FILTER
    // ==========================
    filterBtn?.addEventListener("click", () => {
        datePicker.showPicker ? datePicker.showPicker() : datePicker.click();
    });

    datePicker?.addEventListener("change", () => {
        if (!datePicker.value) return;

        const selectedDate = new Date(datePicker.value);

        filterBtn.innerHTML = `
            <span class="material-symbols-outlined text-[18px]">calendar_today</span>
            ${selectedDate.toDateString()}
        `;
    });

    // ==========================
    // EXPORT CSV
    // ==========================
    exportBtn?.addEventListener("click", () => {

        const today = new Date().toLocaleDateString();

        const data = [
            ["EcoSort Sustainability Report"],
            ["Generated On", today],
            [],
            ["Metric", "Value", "Unit"],
            ["Waste Recycled", stats.waste, "kg"],
            ["Carbon Saved", stats.carbon, "kg CO2e"],
            ["Community Impact", stats.community, "Projects"]
        ];

        const csv = data.map(row => row.join(",")).join("\n");

        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "EcoSort_Report.csv";
        a.click();

        URL.revokeObjectURL(url);

        addNotification("Report downloaded successfully ✅");
    });

    // ==========================
    // VALUE ANIMATION
    // ==========================
    function animateValue(id, end) {
        const el = document.getElementById(id);
        let start = 0;
        const step = Math.ceil(end / 50);

        const counter = setInterval(() => {
            start += step;
            if (start >= end) {
                start = end;
                clearInterval(counter);
            }
            el.textContent = start;
        }, 20);
    }

    animateValue("wasteValue", stats.waste);
    animateValue("carbonValue", stats.carbon);
    animateValue("communityValue", stats.community);

    // ==========================
    // PROGRESS BAR
    // ==========================
    setTimeout(() => {
        const percent = Math.min((stats.waste / 1500) * 100, 100);
        document.getElementById("wasteProgress").style.width = percent + "%";
    }, 300);

    // ==========================
    // MODAL
    // ==========================
    const descriptions = {
        waste: { title: "Waste Recycled", text: "Total recycled waste." },
        carbon: { title: "Carbon Saved", text: "CO2 emissions reduced." },
        community: { title: "Community Impact", text: "Eco participation." }
    };

    function openModal(type) {
        modalTitle.textContent = descriptions[type].title;
        modalContent.textContent = descriptions[type].text;
        modal.classList.remove("hidden");
        modal.classList.add("flex");
    }

    closeModal?.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    ["waste", "carbon", "community"].forEach(type => {
        document.getElementById(type + "Card")?.addEventListener("click", () => {
            openModal(type);
        });
    });

    // ==========================
    // CHART 📊 (ONLY ONCE)
    // ==========================
    const canvas = document.getElementById("recyclingChart");

    if (canvas) {
        const ctx = canvas.getContext("2d");

        const recyclingChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                datasets: [
                    {
                        label: "Plastic",
                        data: [12, 19, 25, 15, 30, 22, 10],
                        backgroundColor: "#13ec49",
                        borderRadius: 8
                    },
                    {
                        label: "Paper",
                        data: [8, 14, 20, 10, 24, 18, 8],
                        backgroundColor: "#60a5fa",
                        borderRadius: 8
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Live update
        setInterval(() => {
            recyclingChart.data.datasets.forEach(dataset => {
                dataset.data = dataset.data.map(v => v + Math.floor(Math.random() * 5 - 2));
            });
            recyclingChart.update();
        }, 4000);
    }

    // ==========================
    // LOGOUT
    // ==========================
    window.logout = function () {
        alert("Logged out!");
        window.location.href = "login.html";
    };

});
// ==========================
// ECO SCORE SYSTEM 🌱
// ==========================
const ecoScore = 84;

const circle = document.getElementById("ecoCircle");
const text = document.getElementById("ecoScoreText");
const label = document.getElementById("ecoLabel");
const message = document.getElementById("ecoMessage");
const btn = document.getElementById("improveBtn");

if (circle && text && label && message) {

    const radius = 65;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;

    const offset = circumference - (ecoScore / 100) * circumference;

    // Animate circle
    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 300);

    // Animate number
    let count = 0;
    const interval = setInterval(() => {
        count++;
        text.textContent = count;

        if (count >= ecoScore) clearInterval(interval);
    }, 20);

    // Dynamic behavior
    if (ecoScore >= 80) {
        label.textContent = "Excellent";
        message.textContent = "You're in the top 5% of eco warriors 🌍";
        circle.style.stroke = "#13ec49";
    } 
    else if (ecoScore >= 50) {
        label.textContent = "Good";
        message.textContent = "You're doing well! Keep improving ♻️";
        circle.style.stroke = "#facc15";
    } 
    else {
        label.textContent = "Needs Work";
        message.textContent = "Start small — recycle more daily 🌱";
        circle.style.stroke = "#ef4444";
    }
}

// ==========================
// BUTTON INTERACTION 🚀
// ==========================
btn?.addEventListener("click", () => {
    alert("Tips:\n• Recycle daily\n• Reduce plastic\n• Join community drives 🌱");
});