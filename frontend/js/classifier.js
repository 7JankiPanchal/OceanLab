document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("imageInput");

    input.addEventListener("change", async function () {

        const file = input.files[0];
        if (!file) return;

        // ✅ Upload box preview (FIXED ID)
        const uploadPreview = document.getElementById("previewImage");
        const uploadContent = document.getElementById("uploadContent");

        uploadPreview.src = URL.createObjectURL(file);
        uploadPreview.classList.remove("hidden");

        // Hide upload text
        if (uploadContent) {
            uploadContent.style.display = "none";
        }

        // ✅ Result section preview
        const resultPreview = document.getElementById("resultImage");
        if (resultPreview) {
            resultPreview.src = URL.createObjectURL(file);
        }

        // ✅ Loading state
        document.getElementById("materialResult").innerText = "Analyzing...";
        document.getElementById("confidenceResult").innerText = "...";

        const formData = new FormData();
        formData.append("file", file);

        try {

            const response = await fetch("http://127.0.0.1:8000/classify", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("API error");
            }

            const data = await response.json();

            const resultEl = document.getElementById("materialResult");

            // ✅ Capitalize result
            resultEl.innerText =
                data.prediction.charAt(0).toUpperCase() + data.prediction.slice(1);

            // ✅ Confidence
            document.getElementById("confidenceResult").innerText =
                data.confidence.toFixed(2) + "%";

            // 🎨 Color logic
            if (data.prediction === "biodegradable") {
                resultEl.style.color = "green";
            } else if (data.prediction === "recyclable") {
                resultEl.style.color = "blue";
            } else {
                resultEl.style.color = "orange";
            }

        } catch (error) {

            console.error(error);
            alert("Error connecting to classifier API");

        }

    });

});