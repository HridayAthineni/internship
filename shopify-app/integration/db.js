const Store = require('../models/store');

async function addToDB(data) {
    // console.log("in add to db",data);
    var store = new Store(data);
              try {
                const a1 = await store.save();
                console.log("Access token saved to DB");

                return "done";
              } catch (error) {
                return {msg: "Access token not saved into DB"}

              }
  }

  async function getAccesstoken(store) {
    try {
        const token = await Store.findOne({name: store});
        // console.log("TOKEN.......",token)
        return token.accessToken;
    } catch (error) {
        console.log(error);
        return;
    }
}

module.exports = { addToDB, getAccesstoken }