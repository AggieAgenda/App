export default function OrganizationView(){
    const orgData = [
        {orgID: "", Name: "lsdkfj"},
        {orgID: "Aggie Agenda"}

    ]
    return (
        <div>

            <h1> This is only for organizatoins</h1>
            <h1>Hello</h1>
            <button>Add Event</button>
            {orgData.map((org)=>(
                
                    <h1 key = {org.orgID}>{org.orgID}</h1>
                
            ))}
        </div>
    );
}