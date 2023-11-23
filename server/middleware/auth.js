const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustom = token.length < 500;

        let decodeData;
        if( token && isCustom ) {
            decodeData = jwt.verify(token, 'test');
            req.userId = decodeData.id;
        } else {
            decodeData = jwt.decode(token);
            req.userId = decodeData.sub;
        }
        next()
    } catch (error) {
        console.log(error);
    }
}

module.exports = auth;