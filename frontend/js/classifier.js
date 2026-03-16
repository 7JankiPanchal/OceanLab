document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("imageInput");

    input.addEventListener("change", async function () {

        const file = input.files[0];
        if (!file) return;

        const preview = document.getElementById("resultImage");
        preview.src = URL.createObjectURL(file);

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

            document.getElementById("materialResult").innerText =
                data.prediction;

            document.getElementById("confidenceResult").innerText =
                (data.confidence * 100).toFixed(2) + "%";

        } catch (error) {

            console.error(error);
            alert("Error connecting to classifier API");

        }

    });

});