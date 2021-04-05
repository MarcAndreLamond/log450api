const formatUser = (user) => {
    return {
        userId: user[0].userid,
        email: user[0].email,
        role: user[0].name
    }
}

const formatOrders = (listOrder) => {
    var listOrderFormatted = [];

    listOrder.forEach(function (val) {
        listOrderFormatted.push(
            {
                orderId: val.orderid,
                photoDelivered: val.photodelivered,
                description: val.description,
                provider: val.provider,
                dateOrdered: val.dateordered,
                dateDeliveryExpected: val.datedeliveryexpected,
                dateDelivered: val.datedelivered,
                status: val.status,
                recipientName: val.recipientname,
                shippingAddress: val.shippingaddress,
                orderPosition: {
                    pointActualLat: val.pointactuallat,
                    pointActualLong: val.pointactuallong,
                    pointArrivalLat: val.pointarrivallat,
                    pointArrivalLong: val.pointarrivallong,
                    dateLastKnownPosition: val.datelastknownposition
                }

            }
        )
    });
    return listOrderFormatted;
}


module.exports = {
    formatUser,
    formatOrders
}