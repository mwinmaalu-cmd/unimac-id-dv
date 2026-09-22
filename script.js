async function loadProfile() {

    const params = new URLSearchParams(window.location.search);
    const staffId = params.get("id");
    alert("Staff ID received: [" + staffId + "]");
console.log("Staff ID received:", staffId);

if (id === staffId.trim()) {
 
alert(
"MATCH FOUND\n" +
"CSV ID: " + id +
"\nURL ID: " + staffId
);

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

        if (!response.ok) {
            throw new Error("Unable to load staff_database.csv");
        }

        const csvText = await response.text();

        // Split into rows
        const rows = csvText.trim().split(/\r?\n/);

        // Skip header row
        for (let i = 1; i < rows.length; i++) {

            // CSV parser that respects quotes
            const cols = rows[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

            if (!cols || cols.length < 10) {
                continue;
            }

            const clean = value =>
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
                    photoPath.replace("ID_Photos\\", "");

                const today = new Date();

                const verificationDate =
                    today.toLocaleDateString();

                const verificationTime =
                    today.toLocaleTimeString();

                const verificationRef =
                    "UNIMAC-" + id;

                const content =
                    document.getElementById("content");

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
                    "ID_Photos/" + photoFile.split(/[\\/]/).pop();

                return;
            }
        }

        document.getElementById("content").innerHTML = `
            <h3>Staff Record Not Found</h3>
            <p>The supplied Staff ID does not exist in the database.</p>
        `;

    }
    catch (error) {

        console.error(error);

        document.getElementById("content").innerHTML = `
            <h3>Error Loading Staff Data</h3>
            <p>${error.message}</p>
        `;
    }
}

loadProfile();
