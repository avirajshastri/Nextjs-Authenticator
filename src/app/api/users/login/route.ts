import {connect} from '@/dbConfig/dbConfig' //sometimes extension ni lagste file ka to error aata
import User from '@/models/user.models.js'
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"


connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {email,password} = reqBody;

        console.log(reqBody)

        //check if user exists
        const user = await User.findOne({email})
        if(!user)
        {
            return NextResponse.json({error:"User does not exist"},
                {status:400}
            )
        }

        //check password
        const isValidPassword = await bcryptjs.compare(password,user.password)

        if(!isValidPassword)
        {
            return NextResponse.json({error: "Invalid password"}, {status: 401})
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token
        const token = await jwt.sign(tokenData,
             process.env.TOKEN_SECRET!,
            {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success:true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;
        
    } catch (error: any) {
        return NextResponse.json({error: error.message},
            {status:500}
        )
    }
}