async function loadProfile() {

    const params = new URLSearchParams(window.location.search);
    const staffId = params.get("id");

    if (!staffId) {
        document.getElementById("content").innerHTML = `
            UniMAC_Images/unimac-logo.png

            <h2>UniMAC Staff Digital Verification System</h2>

            <p>
                Please scan a UniMAC Staff ID Card QR Code to verify a staff member.
            </p>
        `;
        return;
    }

    try {

        const response = await fetch("staff_database.csv");
        const csvText = await response.text();

        const rows = csvText.trim().split("\n");

        for (let i = 1; i < rows.length; i++) {

            const cols = rows[i].split(",");

            const id = cols[0].trim();

            if (id === staffId.trim()) {

                const fullName = cols[1].trim();
                const institute = cols[2].trim();
                const campus = cols[3].trim();
                const department = cols[4].trim();
                const designation = cols[5].trim();
                const status = cols[6].trim();
                const photoFile = cols[7].trim();

                const content = document.getElementById("content");

                content.innerHTML = `
                    UniMAC_Images/unimac-logo.png

                    <h2>✓ UNIMAC STAFF VERIFIED</h2>

                    <img id="staffPhoto" alt="Staff Photo">

                    <h3>${fullName}</h3>

                    <p><strong>Staff ID:</strong><br>${id}</p>

                    <p><strong>Institute:</strong><br>${institute}</p>

                    <p><strong>Campus:</strong><br>${campus}</p>

                    <p><strong>Department:</strong><br>${department}</p>

                    <p><strong>Designation:</strong><br>${designation}</p>

                    <p>
                        <strong>Status:</strong><br>
                        <span class="active">${status}</span>
                    </p>
                `;

                document.getElementById("staffPhoto").src =
                    "ID_Photos/" + photoFile;

                return;
            }
        }

        document.getElementById("content").innerHTML = `
            <h3>Staff Record Not Found</h3>
        `;

    } catch (error) {

        console.error(error);

        document.getElementById("content").innerHTML = `
            <h3>Error loading staff data.</h3>
        `;
    }
}

loadProfile();
