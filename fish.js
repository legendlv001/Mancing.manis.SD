// ==========================================
// fish.js FINAL
// Part 1 - Common Fish
// Crazy Fishing Simulator
// ==========================================

const fishes = [

{
    id: 1,
    name: "Ikan Teri",
    rarity: "Common",
    weight: 0.2,
    length: 12,
    price: 250,
    xp: 5,
    habitat: "Laut"
},

{
    id: 2,
    name: "Ikan Mujair",
    rarity: "Common",
    weight: 0.8,
    length: 25,
    price: 500,
    xp: 8,
    habitat: "Air Tawar"
},

{
    id: 3,
    name: "Ikan Nila",
    rarity: "Common",
    weight: 1.2,
    length: 30,
    price: 750,
    xp: 10,
    habitat: "Air Tawar"
},

{
    id: 4,
    name: "Ikan Lele",
    rarity: "Common",
    weight: 1.5,
    length: 35,
    price: 850,
    xp: 12,
    habitat: "Air Tawar"
},

{
    id: 5,
    name: "Ikan Bandeng",
    rarity: "Common",
    weight: 1.8,
    length: 38,
    price: 1000,
    xp: 15,
    habitat: "Air Payau"
},

{
    id: 6,
    name: "Ikan Tongkol",
    rarity: "Common",
    weight: 2.5,
    length: 45,
    price: 1500,
    xp: 18,
    habitat: "Laut"
},

{
    id: 7,
    name: "Ikan Kembung",
    rarity: "Common",
    weight: 1.1,
    length: 28,
    price: 900,
    xp: 12,
    habitat: "Laut"
},

{
    id: 8,
    name: "Ikan Selar",
    rarity: "Common",
    weight: 0.9,
    length: 24,
    price: 800,
    xp: 10,
    habitat: "Laut"
},

{
    id: 9,
    name: "Ikan Belanak",
    rarity: "Common",
    weight: 1.3,
    length: 31,
    price: 950,
    xp: 12,
    habitat: "Air Payau"
},

{
    id: 10,
    name: "Ikan Gabus",
    rarity: "Common",
    weight: 2.8,
    length: 50,
    price: 1800,
    xp: 20,
    habitat: "Air Tawar"
},

{
    id: 11,
    name: "Ikan Sepat",
    rarity: "Common",
    weight: 0.5,
    length: 18,
    price: 350,
    xp: 6,
    habitat: "Air Tawar"
},

{
    id: 12,
    name: "Ikan Tawes",
    rarity: "Common",
    weight: 1.7,
    length: 40,
    price: 1100,
    xp: 15,
    habitat: "Air Tawar"
},

{
    id: 13,
    name: "Ikan Wader",
    rarity: "Common",
    weight: 0.15,
    length: 10,
    price: 200,
    xp: 4,
    habitat: "Air Tawar"
},

{
    id: 14,
    name: "Ikan Bawal Air Tawar",
    rarity: "Common",
    weight: 2.2,
    length: 42,
    price: 1700,
    xp: 20,
    habitat: "Air Tawar"
},

{
    id: 15,
    name: "Ikan Sapu-sapu",
    rarity: "Common",
    weight: 1.4,
    length: 36,
    price: 400,
    xp: 5,
    habitat: "Air Tawar"
},

{
    id: 16,
    name: "Ikan Cakalang",
    rarity: "Common",
    weight: 3.2,
    length: 58,
    price: 2500,
    xp: 25,
    habitat: "Laut"
},

{
    id: 17,
    name: "Ikan Layang",
    rarity: "Common",
    weight: 1.0,
    length: 27,
    price: 850,
    xp: 10,
    habitat: "Laut"
},

{
    id: 18,
    name: "Ikan Kurisi",
    rarity: "Common",
    weight: 1.6,
    length: 34,
    price: 1200,
    xp: 16,
    habitat: "Laut"
},

{
    id: 19,
    name: "Ikan Kakap Merah",
    rarity: "Uncommon",
    weight: 3.5,
    length: 60,
    price: 3500,
    xp: 30,
    habitat: "Laut"
},

{
    id: 20,
    name: "Ikan Kakap Putih",
    rarity: "Uncommon",
    weight: 4.0,
    length: 65,
    price: 4200,
    xp: 35,
    habitat: "Laut"
},

{
    id: 21,
    name: "Ikan Gurame",
    rarity: "Uncommon",
    weight: 2.8,
    length: 48,
    price: 2800,
    xp: 28,
    habitat: "Air Tawar"
},

{
    id: 22,
    name: "Ikan Patin",
    rarity: "Uncommon",
    weight: 4.5,
    length: 70,
    price: 4500,
    xp: 38,
    habitat: "Air Tawar"
},

{
    id: 23,
    name: "Ikan Baung",
    rarity: "Uncommon",
    weight: 3.8,
    length: 62,
    price: 3900,
    xp: 34,
    habitat: "Air Tawar"
},

{
    id: 24,
    name: "Ikan Baronang",
    rarity: "Uncommon",
    weight: 2.3,
    length: 42,
    price: 2600,
    xp: 26,
    habitat: "Laut"
},

{
    id: 25,
    name: "Ikan Kuwe",
    rarity: "Uncommon",
    weight: 5.2,
    length: 75,
    price: 5200,
    xp: 42,
    habitat: "Laut"
},

{
    id: 26,
    name: "Ikan Talang",
    rarity: "Uncommon",
    weight: 4.8,
    length: 78,
    price: 5000,
    xp: 40,
    habitat: "Laut"
},

{
    id: 27,
    name: "Ikan Tenggiri",
    rarity: "Uncommon",
    weight: 6.5,
    length: 90,
    price: 7000,
    xp: 55,
    habitat: "Laut"
},

{
    id: 28,
    name: "Ikan Bawal Laut",
    rarity: "Uncommon",
    weight: 3.0,
    length: 50,
    price: 3300,
    xp: 30,
    habitat: "Laut"
},

{
    id: 29,
    name: "Ikan Sidat",
    rarity: "Uncommon",
    weight: 2.6,
    length: 95,
    price: 3600,
    xp: 32,
    habitat: "Air Tawar"
},

{
    id: 30,
    name: "Ikan Betutu",
    rarity: "Uncommon",
    weight: 2.1,
    length: 45,
    price: 3400,
    xp: 31,
    habitat: "Air Tawar"
},

{
    id: 31,
    name: "Ikan Belida",
    rarity: "Uncommon",
    weight: 4.7,
    length: 80,
    price: 6000,
    xp: 50,
    habitat: "Air Tawar"
},

{
    id: 32,
    name: "Ikan Nilem",
    rarity: "Uncommon",
    weight: 1.9,
    length: 39,
    price: 2200,
    xp: 22,
    habitat: "Air Tawar"
},

{
    id: 33,
    name: "Ikan Jelawat",
    rarity: "Uncommon",
    weight: 3.9,
    length: 63,
    price: 4700,
    xp: 38,
    habitat: "Air Tawar"
},

{
    id: 34,
    name: "Ikan Kerapu",
    rarity: "Uncommon",
    weight: 5.8,
    length: 82,
    price: 7500,
    xp: 60,
    habitat: "Laut"
},

{
    id: 35,
    name: "Ikan Lencam",
    rarity: "Uncommon",
    weight: 3.2,
    length: 56,
    price: 3600,
    xp: 33,
    habitat: "Laut"
},

{
    id: 36,
    name: "Ikan Kurau",
    rarity: "Uncommon",
    weight: 6.2,
    length: 88,
    price: 8200,
    xp: 65,
    habitat: "Laut"
},

{
    id: 37,
    name: "Ikan Salmon",
    rarity: "Rare",
    weight: 7.5,
    length: 95,
    price: 12000,
    xp: 90,
    habitat: "Laut"
},

{
    id: 38,
    name: "Ikan Tuna Sirip Kuning",
    rarity: "Rare",
    weight: 15.0,
    length: 140,
    price: 18000,
    xp: 120,
    habitat: "Laut"
},

{
    id: 39,
    name: "Ikan Marlin",
    rarity: "Rare",
    weight: 40.0,
    length: 260,
    price: 45000,
    xp: 250,
    habitat: "Laut"
},

{
    id: 40,
    name: "Ikan Mahi-mahi",
    rarity: "Rare",
    weight: 8.5,
    length: 100,
    price: 13500,
    xp: 95,
    habitat: "Laut"
},

{
    id: 41,
    name: "Ikan Barramundi",
    rarity: "Rare",
    weight: 9.0,
    length: 105,
    price: 15000,
    xp: 100,
    habitat: "Air Payau"
},

{
    id: 42,
    name: "Ikan Arwana Silver",
    rarity: "Rare",
    weight: 5.0,
    length: 85,
    price: 25000,
    xp: 180,
    habitat: "Air Tawar"
},

{
    id: 43,
    name: "Ikan Arwana Super Red",
    rarity: "Rare",
    weight: 6.0,
    length: 90,
    price: 50000,
    xp: 350,
    habitat: "Air Tawar"
},

{
    id: 44,
    name: "Ikan Pari",
    rarity: "Rare",
    weight: 30.0,
    length: 180,
    price: 30000,
    xp: 200,
    habitat: "Laut"
},

{
    id: 45,
    name: "Ikan Napoleon",
    rarity: "Rare",
    weight: 22.0,
    length: 150,
    price: 28000,
    xp: 190,
    habitat: "Laut"
},

{
    id: 46,
    name: "Ikan Layur",
    rarity: "Rare",
    weight: 4.5,
    length: 120,
    price: 9000,
    xp: 75,
    habitat: "Laut"
},

{
    id: 47,
    name: "Ikan Buntal",
    rarity: "Rare",
    weight: 2.5,
    length: 35,
    price: 8000,
    xp: 70,
    habitat: "Laut"
},

{
    id: 48,
    name: "Ikan Koi",
    rarity: "Rare",
    weight: 3.0,
    length: 50,
    price: 12000,
    xp: 90,
    habitat: "Air Tawar"
},

{
    id: 49,
    name: "Ikan Louhan",
    rarity: "Rare",
    weight: 2.8,
    length: 40,
    price: 11000,
    xp: 85,
    habitat: "Air Tawar"
},

{
    id: 50,
    name: "Ikan Peacock Bass",
    rarity: "Rare",
    weight: 6.5,
    length: 80,
    price: 17000,
    xp: 130,
    habitat: "Air Tawar"
},

{
    id: 51,
    name: "Ikan Tarpon",
    rarity: "Rare",
    weight: 18.0,
    length: 170,
    price: 35000,
    xp: 220,
    habitat: "Laut"
},

{
    id: 52,
    name: "Ikan Giant Trevally",
    rarity: "Rare",
    weight: 25.0,
    length: 150,
    price: 40000,
    xp: 260,
    habitat: "Laut"
},

{
    id: 53,
    name: "Ikan Kakap Hitam",
    rarity: "Rare",
    weight: 8.5,
    length: 95,
    price: 16000,
    xp: 115,
    habitat: "Laut"
},

{
    id: 54,
    name: "Ikan Rainbow Trout",
    rarity: "Rare",
    weight: 4.0,
    length: 60,
    price: 10000,
    xp: 80,
    habitat: "Air Tawar"
},

{
    id: 55,
    name: "Ikan Hiu Karang",
    rarity: "Epic",
    weight: 45.0,
    length: 220,
    price: 75000,
    xp: 450,
    habitat: "Laut"
},

{
    id: 56,
    name: "Ikan Hiu Martil",
    rarity: "Epic",
    weight: 80.0,
    length: 320,
    price: 120000,
    xp: 650,
    habitat: "Laut"
},

{
    id: 57,
    name: "Ikan Tuna Sirip Biru",
    rarity: "Epic",
    weight: 120.0,
    length: 260,
    price: 150000,
    xp: 800,
    habitat: "Laut"
},

{
    id: 58,
    name: "Ikan Sturgeon",
    rarity: "Epic",
    weight: 95.0,
    length: 250,
    price: 140000,
    xp: 780,
    habitat: "Air Tawar"
},

{
    id: 59,
    name: "Ikan Arapaima",
    rarity: "Epic",
    weight: 140.0,
    length: 280,
    price: 180000,
    xp: 950,
    habitat: "Air Tawar"
},

{
    id: 60,
    name: "Ikan Giant Catfish",
    rarity: "Epic",
    weight: 170.0,
    length: 290,
    price: 220000,
    xp: 1100,
    habitat: "Air Tawar"
},

{
    id: 61,
    name: "Ikan Coelacanth",
    rarity: "Legendary",
    weight: 85.0,
    length: 180,
    price: 350000,
    xp: 1800,
    habitat: "Laut Dalam"
},

{
    id: 62,
    name: "Ikan Oarfish",
    rarity: "Legendary",
    weight: 220.0,
    length: 650,
    price: 500000,
    xp: 2500,
    habitat: "Laut Dalam"
},

{
    id: 63,
    name: "Ikan Hiu Putih",
    rarity: "Legendary",
    weight: 350.0,
    length: 500,
    price: 650000,
    xp: 3200,
    habitat: "Laut"
},

{
    id: 64,
    name: "Ikan Paus Orca",
    rarity: "Legendary",
    weight: 5000.0,
    length: 700,
    price: 1000000,
    xp: 5000,
    habitat: "Samudra"
},

{
    id: 65,
    name: "Ikan Naga Laut",
    rarity: "Mythic",
    weight: 999.0,
    length: 999,
    price: 5000000,
    xp: 10000,
    habitat: "Legenda"
}

];
