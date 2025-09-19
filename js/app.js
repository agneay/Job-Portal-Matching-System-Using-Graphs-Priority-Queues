document.getElementById("run-matching").addEventListener("click", () => {
    try {
        const candidates = JSON.parse(document.getElementById("candidates-input").value);
        const jobs = JSON.parse(document.getElementById("jobs-input").value);

        const results = window.runMatching(candidates, jobs);

        let output = "<ul>";
        results.forEach(r => {
            output += `<li><strong>${r.candidate}</strong> matched with <em>${r.job}</em></li>`;
        });
        output += "</ul>";

        document.getElementById("results").innerHTML = output;
    } catch (err) {
        document.getElementById("results").innerHTML = `<p style='color:red;'>Invalid JSON input</p>`;
    }
});