export default function UserProfile({params}: any) {

    return (
        <div className="flex flex-col items-center min-h-screen justify-center">
            <h1 className="text-3xl"> Profile</h1>
            <p>This is the Profile Page {params.id}</p>
        </div>
    )
}