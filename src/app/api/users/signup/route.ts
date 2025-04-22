import {connect} from '@/dbConfig/dbConfig' //sometimes extension ni lagste file ka to error aata
import User from '@/models/user.models.js'
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'


connect() // no try catch needed here


export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()

        const {username,email,password} = reqBody

        console.log(reqBody);

        //check if user already exist

        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error: "User already exist"},
                {status: 400}
            )
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({   // no nned to write await here save ni kr rhe DB me, just document create kr rhe
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        return NextResponse.json({message: "User created successfully",
            success:true,
            savedUser}
        )
    } catch (error:any) {
        return NextResponse.json({ error: error.message },
             { status: 500 })
    }
}