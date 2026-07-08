// =====================================
// fish.js
// Crazy Fishing Simulator
// =====================================

const fishDatabase = [

{
    id:1,
    name:"Ikan Teri",
    emoji:"🐟",
    rarity:"Common",
    price:20,
    xp:5,
    weight:[0.1,0.3],
    length:[8,15]
},

{
    id:2,
    name:"Lele",
    emoji:"🐟",
    rarity:"Common",
    price:35,
    xp:8,
    weight:[0.5,2.5],
    length:[20,45]
},

{
    id:3,
    name:"Nila",
    emoji:"🐠",
    rarity:"Common",
    price:50,
    xp:10,
    weight:[0.5,3],
    length:[25,50]
},

{
    id:4,
    name:"Gurame",
    emoji:"🐠",
    rarity:"Rare",
    price:150,
    xp:25,
    weight:[2,8],
    length:[35,70]
},

{
    id:5,
    name:"Tuna",
    emoji:"🐟",
    rarity:"Rare",
    price:300,
    xp:40,
    weight:[10,40],
    length:[80,180]
},

{
    id:6,
    name:"Salmon",
    emoji:"🐠",
    rarity:"Epic",
    price:500,
    xp:60,
    weight:[4,15],
    length:[50,120]
},

{
    id:7,
    name:"Hiu",
    emoji:"🦈",
    rarity:"Epic",
    price:1500,
    xp:150,
    weight:[50,300],
    length:[180,500]
},

{
    id:8,
    name:"Paus",
    emoji:"🐋",
    rarity:"Legendary",
    price:5000,
    xp:500,
    weight:[1000,10000],
    length:[500,2500]
},

{
    id:9,
    name:"Kraken",
    emoji:"🦑",
    rarity:"Mythic",
    price:15000,
    xp:1200,
    weight:[2000,15000],
    length:[800,3500]
},

{
    id:10,
    name:"Megalodon",
    emoji:"🦈",
    rarity:"Mythic",
    price:50000,
    xp:5000,
    weight:[5000,25000],
    length:[1000,6000]
}

];

// ==============================
// Peluang rarity
// ==============================

const rarityChance={

Common:55,

Rare:25,

Epic:12,

Legendary:6,

Mythic:2

};

// ==============================
// Random angka
// ==============================

function rand(min,max){

    return Math.random()*(max-min)+min;

}

// ==============================
// Random rarity
// ==============================

function randomRarity(){

    let roll=Math.random()*100;

    let total=0;

    for(let rarity in rarityChance){

        total+=rarityChance[rarity];

        if(roll<=total){

            return rarity;

        }

    }

    return "Common";

}

// ==============================
// Ambil ikan acak
// ==============================

function getRandomFish(){

    const rarity=randomRarity();

    const pool=fishDatabase.filter(

        fish=>fish.rarity===rarity

    );

    const fish=pool[Math.floor(Math.random()*pool.length)];

    return{

        ...fish,

        weight:rand(fish.weight[0],fish.weight[1]).toFixed(2),

        length:Math.round(

            rand(

                fish.length[0],

                fish.length[1]

            )

        )

    };

}

// ==============================
// Cari ikan berdasarkan id
// ==============================

function getFishById(id){

    return fishDatabase.find(

        fish=>fish.id===id

    );

}

// ==============================
// Semua ikan
// ==============================

function getAllFish(){

    return fishDatabase;

}
