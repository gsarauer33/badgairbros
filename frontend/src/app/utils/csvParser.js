export function parseCSV(csvString) {
    // Split into lines, removing any trailing empty lines
    const lines = csvString.trim().split('\n');
    if (lines.length < 2) {
        return []; // No data
    }

    // Grab the header row
    const headers = lines[0].split(',');

    // Find the indexes of the columns we need
    const lonIndex = headers.indexOf('Longitude');
    const latIndex = headers.indexOf('Latitude');
    const fieldIndex = headers.indexOf('Field');
    const yldVolIndex = headers.indexOf('Yld Vol(Dry)(bu/ac)');
    const dateIndex = headers.indexOf('Date');

    // If any of these come back -1, that means the header wasn't found,
    // so you might want to handle that or throw an error.
    // For simplicity, let's assume they're found.

    const result = [];

    // Loop through each data row
    for (let i = 1; i < lines.length; i++) {
        const row = lines[i].split(',');
        if (row.length !== headers.length) {
            // Skip lines that don't match the header length
            continue;
        }

        // Build an object from the relevant columns
        const longitude = parseFloat(row[lonIndex]);
        const latitude = parseFloat(row[latIndex]);
        const fieldName = row[fieldIndex];
        const yieldVolume = parseFloat(row[yldVolIndex]); // e.g. 36.36
        const date = row[dateIndex]; // e.g. "10/22/2024"

        // You can pick other columns, like "Yld Mass(Dry)(lb/ac)" if you prefer
        // just define an index for it in the header check above.

        // Create a record object
        const record = {
            longitude,
            latitude,
            fieldName,
            yieldVolume,
            date,
        };

        result.push(record);
    }

    return result;
}