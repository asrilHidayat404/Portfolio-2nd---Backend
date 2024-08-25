const cleanRowDataPacket = (data) => {
    if (Array.isArray(data)) {
        return data.map(row => cleanRowDataPacket(row));
    } else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
        const cleanedData = {};
        for (const [key, value] of Object.entries(data)) {
            cleanedData[key] = cleanRowDataPacket(value);
        }
        return cleanedData;
    } else {
        return data;
    }
};

export default cleanRowDataPacket;
