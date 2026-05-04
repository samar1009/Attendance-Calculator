// PAGE SWITCH
function showPage(id) {
    document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
    document.getElementById(id).classList.add("active");
    // Highlight active tab
document.querySelectorAll(".nav button").forEach(btn => {
    btn.classList.remove("active-tab");
});
event.target.classList.add("active-tab");
}


// ADD SUBJECT
function addSubject(name = "", a = "", t = "") {
    let table = document.getElementById("subjectTable");

    let row = table.insertRow();

    row.innerHTML = `
        <td><input value="${name}" placeholder="Subject"></td>
        <td><input type="number" value="${a}"></td>
        <td><input type="number" value="${t}"></td>
        <td><button onclick="removeSubject(this)">❌</button></td>
    `;
}


// REMOVE SUBJECT
function removeSubject(btn) {
    let row = btn.parentNode.parentNode;
    row.remove();
}


// CALCULATE SUBJECTS
function calculateSubjects() {
    let rows = document.querySelectorAll("#subjectTable tr");
    let output = "";

    let totalA = 0;
    let totalT = 0;

    let data = [];
    let hasError = false;

    rows.forEach((row, i) => {
        if (i === 0) return;

        let inputs = row.querySelectorAll("input");

        let name = inputs[0].value || "Subject";
        let a = parseInt(inputs[1].value);
        let t = parseInt(inputs[2].value);

        if (isNaN(a) || isNaN(t) || t <= 0) {
            output += `<div class="low">⚠️ ${name}: Invalid input</div>`;
            hasError = true;
            return;
        }

        // ❗ VALIDATION: attended cannot exceed total
        if (a > t) {
            output += `<div class="low">❌ ${name}: Attended cannot be greater than Total</div>`;
            hasError = true;
            return;
        }

        let percent = (a / t) * 100;
        let status = percent >= 75 ? "safe" : "low";

        totalA += a;
        totalT += t;

        data.push({name, a, t});

        output += `
            <div class="${status}">
                ${name}: ${percent.toFixed(1)}%
                <div class="progress">
                    <div class="fill" style="width:${percent}%; background:${percent>=75?'green':'red'}"></div>
                </div>
            </div>
        `;
    });

    // OVERALL (only if no error)
    if (!hasError && totalT > 0) {
        let overall = (totalA / totalT) * 100;

        document.getElementById("overall").innerHTML =
            `<br><b>Overall Attendance: ${overall.toFixed(2)}%</b>`;
        
        // SAVE only valid data
        localStorage.setItem("subjects", JSON.stringify(data));
    } else {
        document.getElementById("overall").innerHTML = "";
    }

    document.getElementById("result").innerHTML = output;
}


// LOAD DATA
window.onload = function () {
    let saved = JSON.parse(localStorage.getItem("subjects"));

    if (saved && saved.length > 0) {
        saved.forEach(sub => addSubject(sub.name, sub.a, sub.t));
    } else {
        addSubject();
    }
};


// BUNK
function calculateBunk() {
    let a = parseInt(b_attended.value);
    let t = parseInt(b_total.value);

    if (isNaN(a) || isNaN(t) || t <= 0 || a > t) {
        b_result.innerHTML = "⚠️ Enter valid values!";
        return;
    }

    let bunk = 0;

    while ((a / (t + 1)) * 100 >= 75) {
        t++;
        bunk++;
    }

    b_result.innerHTML = `You can bunk ${bunk} classes`;
}


// NEEDED
function calculateNeeded() {
    let a = parseInt(n_attended.value);
    let t = parseInt(n_total.value);

    if (isNaN(a) || isNaN(t) || t <= 0 || a > t) {
        n_result.innerHTML = "⚠️ Enter valid values!";
        return;
    }

    let need = 0;

    while ((a / t) * 100 < 75) {
        a++;
        t++;
        need++;
    }

    n_result.innerHTML = `You need to attend ${need} classes`;
}