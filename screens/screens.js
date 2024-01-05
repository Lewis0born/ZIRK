
const o = undefined;

const openingScreen = {
    assetPath: "./assets/overworld/",
    screen: [
        [o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o],
        [o,"1","1","1","1","1","1","1",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","1",{type: "door", tile: 0, coX: 9, coY: 10, screen: "shop"},"1","2",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","2",0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","2",0,0,0,0,0,0,"1","1","1","1","1","1","1",o],
        [o,"1","2",0,0,0,0,0,0,0,"3","1","1","1","1","1","1",o],
        [o,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,o],
        [o,"5","4",0,0,0,0,0,0,0,0,0,0,0,0,"5","5",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1","5","5","5","5","5","5","5","5","5","5","5","5","1","1",o],
        [o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o]
    ]
}

const shop = {
    assetPath: "./assets/shop/",
    screen: [
        [o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"1","1","1","1","1","1","1","1","1","1","1","1","1","1","1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,"0","0",0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1",0,0,0,0,0,0,0,0,0,0,0,0,"1","1",o],
        [o,"1","1","1","1","1","1","1",0,0,"1","1","1","1","1","1","1",o],
        [o,"1","1","1","1","1","1","1",0,0,"1","1","1","1","1","1","1",o],
        [o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o,o]
    ]
}

export {openingScreen, shop};