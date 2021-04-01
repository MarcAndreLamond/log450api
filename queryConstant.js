const getUser = (email) => {
    return "SELECT * from \"User\" natural join Role WHERE email = '" + email + "'";
}

const getListOrderUser = (email) => {
    return "SELECT * FROM \"Order\" where exists ( select * from \"User\" where email = '" + email + "');"
}

const getOrderPosition = (orderPositionId) => {
    return "select * from OrderPosition  WHERE  OrderPositionid = " + orderPositionId;
}

const getOrderPositionList = (deleveryboyId) => {
    return "select orderpositionid from \"Order\" where deleveryUserId = " + deleveryboyId;
}

const modifyOrderPosition = (deleveryboyId, lat, long, date) => {
    return "update OrderPosition" +
        " set dateLastKnownPosition = '" + date + "', pointActualLat = " + lat + ", pointActualLong = " + long +
        " where orderPositionId =" + deleveryboyId;
}

module.exports = {
    getUser,
    getListOrderUser,
    getOrderPosition,
    getOrderPositionList,
    modifyOrderPosition
};