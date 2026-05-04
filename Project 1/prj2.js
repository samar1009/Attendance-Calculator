function calculate() {
    let attended = parseInt(document.getElementById("attended").value);
    let total = parseInt(document.getElementById("total").value);
    let leaves = parseInt(document.getElementById("leaves").value);

    let result = document.getElementById("result");

    if (isNaN(attended) || isNaN(total) || isNaN(leaves)) {
        result.innerHTML = "⚠️ Please fill all fields correctly!";
        return;
    }

    if (attended > total) {
        result.innerHTML = "⚠️ Attended cannot be greater than total classes!";
        return;
    }

    let effectiveAttended = attended + leaves;
    let absent = total - effectiveAttended;
    if (absent < 0) absent = 0;

    let percentage = (effectiveAttended / total) * 100;

    let output = `
        <b>Attendance:</b> ${percentage.toFixed(2)}% <br>
        <b>Absent Classes:</b> ${absent}
    `;

    // Progress bar
    output += `
        <div class="progress">
            <div class="progress-fill" id="progressBar"></div>
        </div>
    `;

    if (percentage >= 75) {
        // BUNK CALCULATOR
        let bunk = 0;
        let newTotal = total;
        let newAttended = effectiveAttended;

        while ((newAttended / (newTotal + 1)) * 100 >= 75) {
            newTotal++;
            bunk++;
        }

        output += `<br><span class="success">✅ You are safe!</span>`;
        output += `<br>You can bunk <b>${bunk}</b> more classes safely.`;

    } else {
        // CLASSES NEEDED
        let need = 0;
        let newTotal = total;
        let newAttended = effectiveAttended;

        while ((newAttended / newTotal) * 100 < 75) {
            newAttended++;
            newTotal++;
            need++;
        }

        output += `<br><span class="warning">❌ Below 75%</span>`;
        output += `<br>You need to attend <b>${need}</b> more classes.`;
    }

    result.innerHTML = output;

    // Update progress bar
    let bar = document.getElementById("progressBar");
    bar.style.width = percentage + "%";

    if (percentage < 75) {
        bar.style.background = "red";
    } else {
        bar.style.background = "green";
    }
}