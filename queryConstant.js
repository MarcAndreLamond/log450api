const getUser = (email) => {
    return "SELECT * from \"User\" natural join Role WHERE email = '" + email + "'";
}

const getListOrder = (userid) => {
    return "SELECT * from \"Order\" WHERE userid = " + userid;
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
    getListOrder,
    getOrderPosition,
    getOrderPositionList,
    modifyOrderPosition
};