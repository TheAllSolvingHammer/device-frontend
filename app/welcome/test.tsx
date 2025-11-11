interface PersonResource{
    name:string,
    age: number,
}

export function Hello({name}:{name:PersonResource}){
    return (
        <div>
            Test2
        </div>
    )
}

function Age() {
    return (
        <div>
            You are 12 years old devil emoji
        </div>
    )
}