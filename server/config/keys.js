
// Vilka nycklar ska returneras till applikationen?
if (process.env.NODE_ENV === 'production') {
    // Appikationen ska ha produktionnycklarna
    module.exports = require('./prod');

} else {
    // Appikationen ska ha test nycklarna
    module.exports = require('./dev');
}
