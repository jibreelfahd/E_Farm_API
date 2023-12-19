const path = require('path');

exports.notFound = (req, res) => {
   res.status(404).sendFile(path.resolve('src', 'public', 'e-gona', 'error.html'));
}