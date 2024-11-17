const generateDynamicMessage = (temp, from, to) => {
    const message = temp.replace(from, to);
    return message;
};

module.exports = generateDynamicMessage;
