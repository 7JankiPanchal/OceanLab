document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("imageInput");

    // ================= IMAGE UPLOAD =================
    input.addEventListener("change", async function () {

        const file = input.files[0];
        if (!file) return;

        const uploadPreview = document.getElementById("previewImage");
        const uploadContent = document.getElementById("uploadContent");

        uploadPreview.src = URL.createObjectURL(file);
        uploadPreview.classList.remove("hidden");

        if (uploadContent) uploadContent.style.display = "none";

        const resultPreview = document.getElementById("resultImage");
        if (resultPreview) resultPreview.src = URL.createObjectURL(file);

        const materialEl = document.getElementById("materialResult");
        const confidenceEl = document.getElementById("confidenceResult");

        materialEl.innerText = "Analyzing...";
        confidenceEl.innerText = "...";

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/classify", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            const formatted =
                data.prediction.charAt(0).toUpperCase() + data.prediction.slice(1);

            materialEl.innerText = formatted;
            confidenceEl.innerText = data.confidence.toFixed(2) + "%";

            if (data.prediction === "biodegradable") {
                materialEl.style.color = "green";
            } else if (data.prediction === "recyclable") {
                materialEl.style.color = "blue";
            } else {
                materialEl.style.color = "orange";
            }

        } catch (error) {
            materialEl.innerText = "Error";
            confidenceEl.innerText = "--";
            alert("API error");
        }
    });

    // ================= NOTIFICATIONS =================
    const notifBtn = document.getElementById("notifBtn");
    const notifDropdown = document.getElementById("notifDropdown");
    const notifList = document.getElementById("notifList");
    const notifBadge = document.getElementById("notifBadge");

    const profileBtn = document.getElementById("profileBtn");
    const profileDropdown = document.getElementById("profileDropdown");

    notifBtn.onclick = () => {
        notifDropdown.classList.toggle("hidden");
        profileDropdown.classList.add("hidden");
    };

    profileBtn.onclick = () => {
        profileDropdown.classList.toggle("hidden");
        notifDropdown.classList.add("hidden");
    };

    document.addEventListener("click", (e) => {
        if (!notifBtn.contains(e.target) && !notifDropdown.contains(e.target)) {
            notifDropdown.classList.add("hidden");
        }
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.add("hidden");
        }
    });

    function loadNotifications() {
        let history = JSON.parse(localStorage.getItem("history")) || [];

        if (history.length === 0) {
            notifList.innerHTML = "No notifications";
            notifBadge.classList.add("hidden");
            return;
        }

        notifList.innerHTML = "";

        history.slice(-5).reverse().forEach(item => {
            const div = document.createElement("div");
            div.className = "p-2 bg-slate-100 rounded";

            div.innerHTML = `
                ♻️ ${item.type}<br>
                <span class="text-xs text-gray-500">${item.time}</span>
            `;

            notifList.appendChild(div);
        });

        notifBadge.innerText = history.length;
        notifBadge.classList.remove("hidden");
    }

    loadNotifications();

    // ================= IMPACT =================
    function updateImpact() {
        let history = JSON.parse(localStorage.getItem("history")) || [];
        let total = history.length * 0.5;

        const el = document.getElementById("totalWaste");
        if (el) el.innerText = total + " kg";
    }

    updateImpact();
});


// ================= GLOBAL FUNCTIONS =================

// SAVE
function saveResult() {
    const result = document.getElementById("materialResult").innerText;
    const confidence = document.getElementById("confidenceResult").innerText;
    const imageSrc = document.getElementById("resultImage").src;

    if (!result || result.includes("Waiting") || result.includes("Analyzing") || result === "Error") {
        alert("No valid result!");
        return;
    }

    let history = JSON.parse(localStorage.getItem("history")) || [];

    const newItem = {
        type: result,
        confidence: confidence,
        time: new Date().toLocaleString(),
        image: imageSrc
    };

    history.push(newItem);
    localStorage.setItem("history", JSON.stringify(history));

    fetch("http://127.0.0.1:8000/save", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newItem)
    }).catch(() => {});

    alert("✅ Saved!");
}

// CLEAR
function clearAll() {
    document.getElementById("imageInput").value = "";

    const preview = document.getElementById("previewImage");
    preview.src = "";
    preview.classList.add("hidden");

    document.getElementById("uploadContent").style.display = "flex";

    document.getElementById("resultImage").src = "";

    document.getElementById("materialResult").innerText = "Waiting for image...";
    document.getElementById("confidenceResult").innerText = "--";
}

// LOGOUT
function logout() {
    if (confirm("Logout?")) {
        localStorage.clear();
        location.reload();
    }
}