export default function UserProfile ({params}:any){
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <h1>User</h1>
            <hr />
            <p className="text-3xl">Profile page {params.id}</p>
        </div>
    )
}