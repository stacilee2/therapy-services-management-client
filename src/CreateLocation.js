import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function CreateLocation ({locations, setLocations}) {

    const[name, setName] = useState("")
    const navigate = useNavigate()

    function onAddLocation(newLocation) {
        console.log("locations", locations);
        console.log("newLocation", newLocation);
        newLocation.clients = []
        const new_locations = [...locations, newLocation];
    
        setLocations(new_locations);
      }

    function handleSubmit(e) {
        e.preventDefault();
        setName("")

        fetch("http://localhost:9292/locations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name}),
            })
            .then((r) => r.json())
            .then((newLocation) => onAddLocation(newLocation))
            navigate('/locations')
            }
            
        function handleChange(e){
            setName(e.target.value)
        }
    
    return (
        <div>
            <h3 className="home-header">Create Location</h3>
            <hr/>
            <br/>
            <form className="location-form-container "onSubmit={handleSubmit}>
                <h3>Add New Location Here:</h3>
                <input 
                type="text"
                onChange={handleChange}
                name="name" 
                value={name}>
                </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateLocation;