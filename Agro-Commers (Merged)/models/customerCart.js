const { Result } = require("express-validator");

// cart
module.exports= {
    add: (item, oldCart, results)=>{
      
        if(oldCart.length==0){
            var a={storedId: item.iid, storedName:item.iname, storedQty: 1, storedPrice: item.iprice };
            oldCart.push(a);
            results(oldCart);
            return;
        }
        if(oldCart.length!=0){
            var exists=false;
            for (var i = 0; i < oldCart.length; i++) {
                if(oldCart[i].storedId == item.iid){
                    exists=true;
                }                
            }

            if(!exists){
                var a={storedId: item.iid, storedName:item.iname, storedQty: 1, storedPrice: item.iprice };
                oldCart.push(a);
                results(oldCart);
                return;
            }else{
                for(var i=0; i<oldCart.length; i++){ 
                    if(oldCart[i].storedId==item.iid){
                        oldCart[i].storedQty++;
                        oldCart[i].storedPrice+=item.iprice;
                    }
                }
                results(oldCart);
                return;
            }

        }
        

    },
    reduceByOne:(item, oldCart, results)=>{
        for(var i=0; i<oldCart.length; i++){ 
            if(oldCart[i].storedId==item.iid){
                if(oldCart[i].storedQty != 0){
                    oldCart[i].storedQty--;
                    oldCart[i].storedPrice-=item.iprice;
                }
            }
        }
        results(oldCart);
        return;
    },
    addByOne:(item, oldCart, results)=>{
        for(var i=0; i<oldCart.length; i++){ 
            if(oldCart[i].storedId==item.iid){
                oldCart[i].storedQty++;
                oldCart[i].storedPrice+=item.iprice;
            }
        }
        results(oldCart);
        return;
    },
}


// cart