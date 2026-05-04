// PAGE SWITCH
function showPage(pageId) {
    let pages = document.querySelectorAll(".page");
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
}


// SUBJECT-WISE CALCULATOR
function calculateSubjects() {
    let subjects = [
        {a: a1.value, t: t1.value, name: "Maths"},
        {a: a2.value, t: t2.value, name: "Java"},
        {a: a3.value, t: t3.value, name: "DBMS"}
    ];

    let output = "";

    subjects.forEach(sub => {
        let a = parseInt(sub.a);
        let t = parseInt(sub.t);

        if (!isNaN(a) && !isNaN(t) && t > 0) {
            let percent = (a / t) * 100;
            let status = percent >= 75 ? "✅ Safe" : "❌ Low";

            output += `${sub.name}: ${percent.toFixed(1)}% (${status}) <br>`;
        }
    });

    document.getElementById("result").innerHTML = output;
}


// BUNK CALCULATOR
function calculateBunk() {
    let a = parseInt(document.getElementById("b_attended").value);
    let t = parseInt(document.getElementById("b_total").value);

    if (isNaN(a) || isNaN(t) || t === 0) {
        document.getElementById("b_result").innerHTML = "Enter valid values!";
        return;
    }

    let bunk = 0;

    while ((a / (t + 1)) * 100 >= 75) {
        t++;
        bunk++;
    }

    document.getElementById("b_result").innerHTML =
        `You can bunk ${bunk} classes`;
}


// CLASSES NEEDED
function calculateNeeded() {
    let a = parseInt(document.getElementById("n_attended").value);
    let t = parseInt(document.getElementById("n_total").value);

    if (isNaN(a) || isNaN(t) || t === 0) {
        document.getElementById("n_result").innerHTML = "Enter valid values!";
        return;
    }

    let need = 0;

    while ((a / t) * 100 < 75) {
        a++;
        t++;
        need++;
    }

    document.getElementById("n_result").innerHTML =
        `You need to attend ${need} classes`;
}