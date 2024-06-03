document.getElementById('fileInput').addEventListener('change', function(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select an Excel file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Generate HTML table
        const table = document.createElement('table');
        table.innerHTML = '<tr><th>No</th><th>Jenis Anjing</th><th>Mulai</th><th>Selesai</th></tr>';
        for (let i = 1; i < jsonData.length; i++) {
            const row = table.insertRow();
            for (let j = 0; j < jsonData[i].length; j++) {
                const cell = row.insertCell();
                cell.textContent = jsonData[i][j];
            }
        }

        document.getElementById('tableContainer').innerHTML = '';
        document.getElementById('tableContainer').appendChild(table);

        // Enable the optimize button
        document.getElementById('optimizeButton').removeAttribute('disabled');
        // Store the data in a variable accessible to the optimize button click event
        window.optimizableData = jsonData;
    };

    reader.readAsArrayBuffer(file);
});

document.getElementById('optimizeButton').addEventListener('click', function() {
    if (!window.optimizableData) {
        alert('Please select an Excel file first.');
        return;
    }

    const activities = window.optimizableData.slice(1).map((row, index) => ({
        no: row[0], 
        jenis: row[1], 
        start: row[2], 
        finish: row[3], 
        originalIndex: index + 1
    }));
    

    const optimizedActivities = activitySelection(activities);
    // Generate HTML table for optimized activities
    const table = document.createElement('table');
    table.innerHTML = '<tr><th>No</th><th>Jenis Anjing</th><th>Mulai</th><th>Selesai</th></tr>';
    for (let i = 0; i < optimizedActivities.length; i++) {
        const row = table.insertRow();
        const activity = optimizedActivities[i];
        row.insertCell().textContent = activity.no;
        row.insertCell().textContent = activity.jenis;
        row.insertCell().textContent = activity.start;
        row.insertCell().textContent = activity.finish;
    }

    document.getElementById('tableContainer').innerHTML = '';
    document.getElementById('tableContainer').appendChild(table);
    document.getElementById('countContainer').innerHTML = `<p>Number of optimized activities: ${optimizedActivities.length}</p>`;

});

function calculateEndHour(jenisAnjing, mulaiHour) {
    const jenisDuration = {
        kecil: 1,  // 1 hour
        sedang: 2, // 2 hours
        besar: 3   // 3 hours
    };

    if (!jenisDuration.hasOwnProperty(jenisAnjing)) {
        throw new Error(`Invalid jenis anjing: ${jenisAnjing}. Allowed values are: ${Object.keys(jenisDuration).join(", ")}`);
    }

    return mulaiHour + jenisDuration[jenisAnjing];
}

function activitySelection(arr) {
    const startTime = performance.now();

    // Sorting the activities in increasing order of their finish time
    arr.sort((a, b) => a.finish - b.finish);

    const selectedActivities = [];
    let lastFinishTime = 0;

    for (let activity of arr) {
        if (activity.start >= lastFinishTime) {
            selectedActivities.push(activity);
            lastFinishTime = activity.finish;
        }
    }

    const endTime = performance.now();
    const runningTime = endTime - startTime;
    
    // Display running time
    document.getElementById('timeContainer').innerHTML = `<p>Running time: ${runningTime.toFixed(2)} milliseconds</p>`;
    
    return selectedActivities;
}

