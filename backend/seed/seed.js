import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import Provider from "../models/Provider.js";
import Service from "../models/Service.js";
import "dotenv/config.js";

// ----------------- DB CONNECTION -----------------
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { dbName: "HouseHub" });
        console.log("MongoDB Connected ✔");
    } catch (err) {
        console.log("DB Error:",err.message);
        process.exit(1);
    }
};

// Random generator
const random = (arr)=>arr[Math.floor(Math.random()*arr.length)];

const serviceCategories = [
  "Plumber","Electrician","Cleaner","Carpenter","Painter",
  "AC Repair","Pest Control","Appliance Repair","Gardener","Laundry"
];

const cities = ["Delhi","Mumbai","Bangalore","Hyderabad","Kolkata","Chennai","Pune","Jaipur"];
const states = ["UP","MH","KA","TS","WB","TN","MH","RJ"];
const firstNames = ["Aman", "Ankit", "Rahul", "Binod", "Charan", "Dinesh", "Elvish", "Naman", "Snajay", "Gaurav", "Vikas", "John", "Will", "Tom"];
const lastNames = ["Singh", "Pratap", "Tiwari", "Patil", "Yadav", "Smith", "Rodriguez", "Pratap", "Rajput"];

// ----------------- DATA GENERATION -----------------

const generateUsers = async ()=>{
    const users=[];
    const password = await bcrypt.hash("password123",10);

    for(let i=1;i<=40;i++){
        let fn = random(firstNames), ln = random(lastNames);
        users.push({
            name:`${fn} ${ln}`,
            email:`${fn}@user${i}.com`,
            password,
            role:"user",
            profilePic:"https://plus.unsplash.com/premium_vector-1727953894835-e3945c47a7c0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
            address:{
                city:random(cities),
                state:random(states),
                zip:`1100${i}`
            }
        })
    }
    // console.log(users);
    return users;
}

const generateAdmins = async ()=>{
    const admins=[];
    const password = await bcrypt.hash("admin123",10);

    for(let i=1;i<=10;i++){
        let fn = random(firstNames), ln = random(lastNames);
        admins.push({
            name:`${fn} ${ln}`,
            email:`${fn}@admin${i}.com`,
            password,
            role:"admin",
            profilePic:"https://plus.unsplash.com/premium_vector-1728553013500-b5a3d628fb7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
        })
    }
    // console.log(admins);
    return admins;
}

const generateProviders = async (users)=>{
    const providers=[];

    const shortlistedUsers = users.slice(0,15); // first 10 become providers
    shortlistedUsers.forEach((u,i)=>{
        let service = random(serviceCategories);
        providers.push({
            userId:u._id,
            serviceCategory:service,
            experience: Math.floor(Math.random()*10)+1,
            bio:`Experienced ${service} offering reliable service.`,
            hourlyRate: Math.floor(Math.random()*400)+200,
            rating:(Math.random()*2+3).toFixed(1), // between 3-5
            totalReviews:Math.floor(Math.random()*200),
            profilePic:"https://plus.unsplash.com/premium_vector-1727952231969-10d3f8f091f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHx1c2VyfGVufDB8fDB8fHww",
            approved: Math.random()>0.3 // randomly approved
        })
    });
    // console.log(providers);
    return providers;
}

const generateServices = ()=>{
    return serviceCategories.map(s=>({
        name:s,
        description:`Professional ${s} services available.`,
        price:Math.floor(Math.random()*500)+300
    }));
}

// ----------------- SEED RUNNER -----------------

const seed = async ()=>{
    await connectDB();

    // Clear previous
    await User.deleteMany();
    await Provider.deleteMany();
    await Service.deleteMany();

    console.log("\n🗑 Existing data cleared");

    // Insert new users & admins
    const users = await User.insertMany(await generateUsers());
    const admins = await User.insertMany(await generateAdmins());

    console.log(`👤 Users created: ${users.length}`);
    console.log(`🔐 Admins created: ${admins.length}`);

    // Services + Providers
    const services = await Service.insertMany(generateServices());
    console.log(`🛠 Services created: ${services.length}`);

    const providers = await Provider.insertMany(await generateProviders(users));
    console.log(`🏅 Providers created: ${providers.length}`);

    console.log("\n✨ SEEDING SUCCESSFUL — DATABASE READY!");
    process.exit();
}

seed();
