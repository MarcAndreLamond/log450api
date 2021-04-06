const getUser = (email) => {
    return "SELECT * from \"User\" natural join Role WHERE email = '" + email + "'";
}

const getListOrderUser = (email) => {
    return "SELECT * FROM \"Order\" left join \"User\" on \"User\".userid =\"Order\".userid join OrderPosition ON OrderPosition.orderpositionid = \"Order\".orderpositionid  where \"User\".email = '" + email + "'"
}

const getListOrderUserDelevery = (email) => {
    return "SELECT * FROM \"Order\" left join \"User\" on \"User\".userid =\"Order\".deleveryuserid join OrderPosition ON OrderPosition.orderpositionid = \"Order\".orderpositionid  where \"User\".email = '" + email + "'"
}

const getOrderPosition = (orderPositionId) => {
    return "select * from OrderPosition  WHERE  OrderPositionid = " + orderPositionId;
}



const getOrderPositionList = (deleveryboyId) => {
    return "select orderpositionid from \"Order\" where deleveryUserId = " + deleveryboyId;
}

const modifyOrderPosition = (email, lat, long, date) => {
    return "update OrderPosition set dateLastKnownPosition = '" + date + "', pointActualLat = " + lat + ", pointActualLong  = " + long + " from \"Order\" join"
        + " \"User\" on \"User\".userid = \"Order\".deleveryuserid and \"User\".email = '" + email + "' where OrderPosition.orderpositionid = \"Order\".orderpositionid";
}

const modifyOrder = (orderId, date, photoByte) => {
    return "update \"Order\" set dateDelivered = '" + date + "', status = 'delivered', photodelivered = decode('" + photoByte + "','base64') where \"Order\".orderid = " + orderId;
}

module.exports = {
    getUser,
    getListOrderUser,
    getOrderPosition,
    getOrderPositionList,
    modifyOrderPosition,
    getListOrderUserDelevery,
    modifyOrder
};