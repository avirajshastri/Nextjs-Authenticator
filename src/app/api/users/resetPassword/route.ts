import {connect} from '@/dbConfig/dbConfig' //sometimes extension ni lagste file ka to error aata
import User from '@/models/user.models.js'
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailers'


connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()

        const {email} = reqBody;

        const user  = await User.findOne({email})

        if(!user)
        {
            return NextResponse.json({
                message: "User does not exist",
                status: 500,
            })
        }

        await sendEmail({email,emailType:"RESET",
            userId: user._id
        })

        return NextResponse.json({message: "Mail sent successfully",
                    success:true,
        })

    } catch (error:any) {
        return NextResponse.json({ error: error.message },
            { status: 500 })
    }
}