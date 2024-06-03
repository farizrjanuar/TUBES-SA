function saveFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file to upload.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const fileContent = event.target.result;

        const blob = new Blob([fileContent], { type: file.type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    reader.readAsArrayBuffer(file);
}

function sheet_to_html_table(sheet) {
    const table = document.createElement('table');
    const range = XLSX.utils.decode_range(sheet['!ref']);

    for (let row = range.s.r; row <= range.e.r; row++) {
        const tr = document.createElement('tr');
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cellAddress = { c: col, r: row };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const cell = sheet[cellRef];
            const td = document.createElement(row === 0 ? 'th' : 'td');
            td.textContent = cell ? cell.v : '';
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    return table.outerHTML;
}