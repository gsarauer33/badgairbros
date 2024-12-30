export function parseCSV(csvString) {
    const lines = csvString.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
    const data = lines.slice(1).map(line => {
        const values = line.split(',');
        let rowObj = {};
        headers.forEach((header, i) => {
            rowObj[header] = values[i]?.trim() ?? '';
        });
        return rowObj;
    });
    return data;
}