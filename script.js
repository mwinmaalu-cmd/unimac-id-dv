async function loadProfile() {

    const params = new URLSearchParams(window.location.search);
    const staffId = params.get("id");

    if (!staffId) {

        const content = document.getElementById("content");

        content.innerHTML = `
            <img class="logo" id="logo" alt="UniMAC Logo">

            <h2>UniMAC Staff Digital Verification System</h2>

            <p>
                Please scan a UniMAC Staff ID Card QR Code to verify a staff member.
            </p>
        `;

        document.getElementById("logo").src =
            "UniMAC_Images/unimac-logo.png";

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
                    <img class="logo" id="logo" alt="UniMAC Logo">

                    <h2>
                        <span class="verification-check">✓</span>
                        UNIMAC STAFF VERIFIED
                    </h2>

                    <img id="staffPhoto" alt="Staff Photo">

                    <h3>${fullName}</h3>

                    <div class="info-block">
                        <div class="info-label">Staff ID</div>
                        <div class="info-value">${id}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Institute</div>
                        <div class="info-value">${institute}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Campus</div>
                        <div class="info-value">${campus}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Department</div>
                        <div class="info-value">${department}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Designation</div>
                        <div class="info-value">${designation}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Status</div>
                        <div class="active">${status}</div>
                    </div>

                    <div class="button-container">
                        <button class="action-btn print-btn" onclick="window.print()">
                            Print Profile
                        </button>

                        <button class="action-btn close-btn" onclick="window.close()">
                            Close
                        </button>
                    </div>
                `;

                document.getElementById("logo").src =
                    "UniMAC_Images/unimac-logo.png";

                document.getElementById("staffPhoto").src =
                    "ID_Photos/" + photoFile;

                return;
            }
        }

        document.getElementById("content").innerHTML =
            "<h3>Staff Record Not Found</h3>";

    } catch (error) {

        console.error(error);

        document.getElementById("content").innerHTML =
            "<h3>Error loading staff data.</h3>";
    }
}

loadProfile();
