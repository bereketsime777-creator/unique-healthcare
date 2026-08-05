const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.unique-healthcare-clust.vlsnrnp.mongodb.net",
  (err, address) => {

    if(err){

      console.log("DNS ERROR:");
      console.log(err);

    }else{

      console.log("DNS SUCCESS:");
      console.log(address);

    }

  }
);