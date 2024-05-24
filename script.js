function calculateResults() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const cre = parseFloat(document.getElementById('creatinine').value);
    const gender = document.getElementById('gender').value;

    let eGFR = calculateEGFR(cre, age, gender);
    let creatinineClearance = calculateCreatinineClearance(cre, age, weight, gender);

    document.getElementById('resultEGFR').textContent = `eGFR: ${eGFR.toFixed(2)} mL/min/1.73m²`;
    document.getElementById('resultCreatinineClearance').textContent = `Creatinine Clearance: ${creatinineClearance.toFixed(2)} mL/min`;
    document.getElementById('results').style.display = 'block';
}

function calculateEGFR(cre, age, gender) {
    let eGFR = 0;
    const crePow = Math.pow(cre, -1.094);
    const agePow = Math.pow(age, -0.287);

    if (gender === "Male") {
        eGFR = 194 * crePow * agePow;
    } else if (gender === "Female") {
        eGFR = 194 * crePow * agePow * 0.739;
    }
    return eGFR;
}

function calculateCreatinineClearance(cre, age, weight, gender) {
    let clearance = ((140 - age) * weight) / (72 * cre);
    if (gender === "Female") {
        clearance *= 0.85;
    }
    return clearance;
}
