async function loadProfile() {

    const params = new URLSearchParams(window.location.search);
    const staffId = params.get("id");

    if (!staffId) {
        document.getElementById("content").innerHTML = `
            <h2>UniMAC Staff Digital Verification System</h2>
            <p>Please scan a UniMAC Staff ID Card QR Code to verify a staff member.</p>
        `;
        return;
    }

    try {

        const response = await fetch("staff_database.csv");
        const csvText = await response.text();

        const rows = csvText.trim().split("\n");

        for (let i = 1; i < rows.length; i++) {

            const cols = rows[i].split(",");

            if (cols[0].trim() === staffId.trim()) {

                const photoFile = cols[7].trim();

                document.getElementById("content").innerHTML = `
                    <h2>✓ UNIMAC STAFF VERIFIED</h2>

                    File}" alt="Staff Photo">

                    <h3>${cols[1]}</h3>

                    <p><strong>Staff ID:</strong><br>${cols[0]}</p>

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

    } catch (error) {

        console.error(error);

        document.getElementById("content").innerHTML =
            "<h3>Error loading staff data</h3>";
    }
}

loadProfile();
