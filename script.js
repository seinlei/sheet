let customColumns = [];

// Add column button
document.getElementById("addColumnBtn").addEventListener("click", () => {
    const newColumn = document.getElementById("newColumnInput").value.trim();
    if (newColumn && !customColumns.includes(newColumn)) {
        customColumns.push(newColumn);
        updateColumnList();
        document.getElementById("newColumnInput").value = "";
    }
});

function updateColumnList() {
    const list = document.getElementById("columnList");
    list.innerHTML = "";
    customColumns.forEach((col, index) => {
        const item = document.createElement("div");
        item.textContent = `${index + 1}. ${col}`;
        list.appendChild(item);
    });
}

// Start data entry
document.getElementById("startFormBtn").addEventListener("click", () => {
    if (customColumns.length === 0) {
        alert("Please add at least one column first.");
        return;
    }

    localStorage.setItem("customColumns", JSON.stringify(customColumns));
    buildForm(customColumns);
    document.querySelector(".column-builder").style.display = "none";
    document.getElementById("dataEntryForm").style.display = "block";
});

// Build the data entry form dynamically
function buildForm(columns) {
    const form = document.getElementById("dataEntryForm");
    form.innerHTML = "";

    columns.forEach(col => {
        const label = document.createElement("label");
        label.textContent = col;
        label.setAttribute("for", col);

        const input = document.createElement("input");
        input.type = "text";
        input.id = col;
        input.required = true;

        form.appendChild(label);
        form.appendChild(input);
    });

    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Save Entry";
    form.appendChild(submitBtn);

    form.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();

    const formData = {};
    customColumns.forEach(col => {
        formData[col] = document.getElementById(col).value.trim();
    });

    let entries = JSON.parse(localStorage.getItem("formEntries")) || [];
    entries.push(formData);
    localStorage.setItem("formEntries", JSON.stringify(entries));

    alert("Entry saved!");
    event.target.reset();
}


// Show saved entries page
document.getElementById("showEntriesBtn").addEventListener("click", () => {
    window.location.href = "entries.html";
});

window.addEventListener("DOMContentLoaded", () => {
    const editData = JSON.parse(localStorage.getItem("editEntry"));
    const editIndex = localStorage.getItem("editIndex");
    const savedColumns = JSON.parse(localStorage.getItem("customColumns")) || [];

    if (editData && editIndex !== null && savedColumns.length > 0) {
        customColumns = savedColumns;
        buildForm(customColumns);

        // Show the form and hide the column builder
        document.querySelector(".column-builder").style.display = "none";
        document.getElementById("dataEntryForm").style.display = "block";

        // Pre-fill inputs
        customColumns.forEach(col => {
            const input = document.getElementById(col);
            if (input) input.value = editData[col] || "";
        });

        // When the form is submitted, update the existing entry
        document.getElementById("dataEntryForm").addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = {};
            customColumns.forEach(col => {
                formData[col] = document.getElementById(col).value.trim();
            });

            let entries = JSON.parse(localStorage.getItem("formEntries")) || [];
            entries[editIndex] = formData;
            localStorage.setItem("formEntries", JSON.stringify(entries));

            // Clear editing state
            localStorage.removeItem("editEntry");
            localStorage.removeItem("editIndex");

            alert("Entry updated!");
            window.location.href = "entries.html";
        }, { once: true }); // prevent duplicate submits
    }
});

