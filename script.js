async function loadProfile() {

    const params = new URLSearchParams(window.location.search);
    const staffId = params.get("id");

    if (!staffId) {
        document.getElementById("content").innerHTML =
            "<h3>No Staff ID supplied.</h3>";
        return;
    }

    const response = await fetch("staff_database.csv");
    const csvText = await response.text();

    const rows = csvText.trim().split("\n");

    for (let i = 1; i < rows.length; i++) {

        const cols = rows[i].split(",");

        if (cols[0] === staffId) {

            const photo = cols[7];

            document.getElementById("content").innerHTML = `
                <h2>✓ UNIMAC STAFF VERIFIED</h2>

                <img srcs/${photo}

                <h3>${cols[1]}</h3>

                <p><strong>Staff ID:</strong> ${cols[0]}</p>

                <p><strong>Institute:</strong><br>${cols[2]}</p>

                <p><strong>Campus:</strong><br>${cols[3]}</p>

                <p><strong>Department:</strong><br>${cols[4]}</p>

                <p><strong>Designation:</strong><br>${cols[5]}</p>

                <p><strong>Status:</strong><br>
                <span class="active">${cols[6]}</span></p>
            `;

            return;
        }
    }

    document.getElementById("content").innerHTML =
        "<h3>Staff Record Not Found</h3>";
}

loadProfile();
