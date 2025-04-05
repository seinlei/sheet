if (document.getElementById("dataEntryForm")) {
    document.getElementById("dataEntryForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let notes = document.getElementById("notes").value.trim();

        // Regular expression for validation
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const phonePattern = /^\d{7,15}$/;

        if (!name) {
            alert("Name is required");
            return;
        }
        if (!emailPattern.test(email)) {
            alert("Invalid email address");
            return;
        }
        if (!phonePattern.test(phone)) {
            alert("Invalid phone number");
            return;
        }

        let entries = JSON.parse(localStorage.getItem("formEntries")) || [];

        let editIndex = parseInt(localStorage.getItem("editIndex"));
        if (!isNaN(editIndex)) {
            // Editing an existing entry
            entries[editIndex] = { name, email, phone, notes };

            // Clear edit data
            localStorage.removeItem("editIndex");
            localStorage.removeItem("editEntry");
        } else {
            // Adding a new entry
            entries.push({ name, email, phone, notes });
        }

        localStorage.setItem("formEntries", JSON.stringify(entries));
        this.reset();
        alert("Data saved successfully");

        window.location.href = "entries.html"; // Redirect to saved entries
    });

    // If editing, load the existing data into the form
    let editEntry = localStorage.getItem("editEntry");
    if (editEntry) {
        let entry = JSON.parse(editEntry);

        document.getElementById("name").value = entry.name;
        document.getElementById("email").value = entry.email;
        document.getElementById("phone").value = entry.phone;
        document.getElementById("notes").value = entry.notes;
    }
}
document.getElementById("showEntriesBtn").addEventListener("click", function () {
    window.location.href = "entries.html"; // Redirect to the saved entries page
});
