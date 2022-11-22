function roll(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pick(msg) {
    let options = msg.content.replace('!pick ', '').split(',');
    for (var key in options) {
        options[key] = options[key].trim();
    }
    let picked = roll(0, options.length - 1);
    return `Fuck it. ${options[picked]}.`;
}

module.exports = { pick }
