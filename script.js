async function loadProfile() {

    const params = new URLSearchParams(window.location.search);
    const staffId = params.get("id");

    const content = document.getElementById("content");

    if (!staffId) {

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

        const response = await fetch(
            "staff_database.csv?v=" + Date.now()
        );

        if (!response.ok) {
            throw new Error("Unable to load staff database.");
        }

        const csvText = await response.text();

        const rows = csvText.trim().split(/\r?\n/);

        for (let i = 1; i < rows.length; i++) {

            const cols =
                rows[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

            if (!cols || cols.length < 10) {
                continue;
            }

            const clean = (value) =>
                value.replace(/^"|"$/g, "").trim();

            const id = clean(cols[0]);

            if (id === staffId.trim()) {

                const fullName = clean(cols[1]);
                const photoPath = clean(cols[2]);
                const institute = clean(cols[4]);
                const campus = clean(cols[5]);
                const department = clean(cols[6]);
                const designation = clean(cols[7]);
                const status = clean(cols[8]);

                const photoFile =
                    photoPath.split(/[\\/]/).pop();

                const today = new Date();

                const verificationDate =
                    today.toLocaleDateString();

                const verificationTime =
                    today.toLocaleTimeString();

                const verificationRef =
                    "UNIMAC-" + id;

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
                        <div class="info-value">${campus || "N/A"}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Department</div>
                        <div class="info-value">${department}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Designation</div>
                        <div class="info-value">${designation || "N/A"}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Status</div>
                        <div class="active">${status}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Verified On</div>
                        <div class="info-value">${verificationDate}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Verified At</div>
                        <div class="info-value">${verificationTime}</div>
                    </div>

                    <div class="info-block">
                        <div class="info-label">Verification Reference</div>
                        <div class="info-value">${verificationRef}</div>
                    </div>

                    <div class="button-container">

                        <button class="action-btn print-btn"
                                onclick="window.print()">
                            Print Profile
                        </button>

                        <button class="action-btn back-btn"
                                onclick="history.back()">
                            Back
                        </button>

                    </div>

                    <div class="footer">
                        <strong>
                            UniMAC Staff Digital Verification System
                        </strong>
                        <br>
                        ICT Directorate
                        <br>
                        University of Media, Arts and Communication (UniMAC)
                        <br><br>
                        This profile is generated from the official UniMAC Staff Database.
                    </div>
                `;

                document.getElementById("logo").src =
                    "UniMAC_Images/unimac-logo.png";

                document.getElementById("staffPhoto").src =
                    "ID_Photos/" + photoFile;

                return;
            }
        }

        content.innerHTML = `
            <h3>Staff Record Not Found</h3>
            <p>The supplied Staff ID does not exist in the database.</p>
        `;

    } catch (error) {

        console.error(error);

        content.innerHTML = `
            <h3>Error Loading Staff Data</h3>
            <p>${error.message}</p>
        `;
    }
}

loadProfile();
