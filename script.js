function analyze() {
    const smiles = document.getElementById("inputSmiles").value;
    const mol_weight = parseFloat(document.getElementById("input1").value);
    const logp = parseFloat(document.getElementById("input2").value);
    const hbd = parseFloat(document.getElementById("inputHBD").value);
    const hba = parseFloat(document.getElementById("inputHBA").value);
    const tpsa = parseFloat(document.getElementById("inputTPSA").value);
    const num_rings = parseFloat(document.getElementById("inputRings").value);

   fetch("https://nephrotoxicity.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        smiles,
        mol_weight,
        logp,
        hbd,
        hba,
        tpsa,
        num_rings
    })
})

    .then(res => res.json())
    .then(data => {
        document.getElementById("resultBox").style.display = "block";

        const prediction = data.prediction;
        const prob = data.probability_nephrotoxic;

        let riskText = prediction === 1 ? "⚠ HIGH RISK" : "✔ LOW RISK";
        let color = prediction === 1 ? "#ff4d4d" : "#00ff88";

        document.getElementById("riskStatus").innerHTML = riskText;
        document.getElementById("riskStatus").style.color = color;

        const gaugePercent = Math.round(prob * 100);
        document.getElementById("gaugeFill").style.width = gaugePercent + "%";
        document.getElementById("gaugePercentage").innerHTML = gaugePercent + "%";

        document.getElementById("explanation").innerHTML = `
            Prediction: ${prediction === 1 ? "High nephrotoxic risk" : "Low nephrotoxic risk"}<br>
            Probability Score: ${prob}<br>
            A higher score means more chance of toxic kidney reaction.
        `;
    })
    .catch(err => alert("Error connecting to API: " + err));
}
