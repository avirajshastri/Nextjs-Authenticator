import {connect} from "@/dbConfig/dbConfig"
import { NextRequest,NextResponse } from "next/server"
import User from "@/models/user.models"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        console.log(reqBody)
        const {newPassword,token} = reqBody
            console.log(newPassword)
            console.log({$gt: Date.now()})
            const user = await User.findOne({forgotPasswordToken: token,
                forgotPasswordTokenExpiry: {$gt: Date.now()}
            })
    
            if(!user){
                console.log(user);
                return NextResponse.json({error:"Inavlid token"},
                    {status: 400}
                )
            }
            
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(newPassword,salt)
            user.password = hashedPassword
            await user.save()

            return NextResponse.json({
                message: "Password changes successfully",
                success: true,
            })
    } catch (error:any) {
        return NextResponse.json({error:error.message},
            {status:500}
        )
    }
}