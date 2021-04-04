const getUser = (email) => {
    return "SELECT * from \"User\" natural join Role WHERE email = '" + email + "'";
}

const getListOrderUser = (email) => {
    return "SELECT orderid,  photodelivered ,description, provider, dateordered,datedeliveryexpected, datedelivered, status, orderpositionid FROM \"Order\" left join \"User\" on \"User\".userid =\"Order\".userid where \"User\".email = '" + email + "'"
}

const getListOrderUserDelevery = (email) => {
    return "SELECT orderid,  photodelivered ,description, provider, dateordered,datedeliveryexpected, datedelivered, status, orderpositionid FROM \"Order\" left join \"User\" on \"User\".userid =\"Order\".deleveryuserid where \"User\".email = '" + email + "'"
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
    modifyOrderPosition,
    getListOrderUserDelevery
};