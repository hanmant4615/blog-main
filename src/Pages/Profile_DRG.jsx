import img from "../images/home.jpg"
// import img from '../images/home.jpg' 
import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createURL } from "../config";

function Profile() {

    // firstName = sessionStorage["firstName"];
    // lastName = sessionStorage["lastName"];
    // email = sessionStorage["email"];

    
    const [image, setImage] = useState('')
    const [items, setItems] = useState();
    const navigate = useNavigate();

    const loadProfile = () => {
        const url = createURL("user/profile-image");

        const token = sessionStorage["token"];
        if (!token) {
            navigate("/");
            return;
        }
        axios.get(url, {
            headers: {
                "x-token": token,
            },
        })
            .then((response) => {
                const result = response.data;
                if (result["status"] === "success") {
                    const data = result["data"];
                    console.log(data.profileImage);
                    setItems(data)
                } else {
                    alert("error while loading your Profile");
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log(`error: `, error)
            });
    };

    useEffect(() => {
        loadProfile();
    }, []);
    



    const onUpload = () =>{

        const formData = new FormData();
        formData.append("image",image)

    const url = createURL("user/upload-profile-image");

    axios.post(url, 
        formData, {
            headers:{
                'x-token': sessionStorage['token']
            }
        }).then(response => {
            const result = response.data
            if (result['status']=== 'success'){
                alert("prfile added successfully")
                loadProfile()
            }else{
                alert("Something went wrong")
            }
        })
        
    }

    // fileSelectHandler = event =>{
    //     console.log(event.target.files[0])
    // }
    
    

    return <div>

        <h2>Profile</h2>

        <div className="profile-container">

            <div className="img">
                {items && <img src={'http://localhost:3000/'+ items.profileImage} alt="profile img"/>}
            </div>

            <div className="mb-3">
                {/* <form>
                    <input type="file" />
                </form> */}
                 <div>
                    <input type='file' onChange={(e)=>{setImage(e.target.files[0])}}/>
                </div>

                <div>
                    <button onClick={onUpload} className="btn btn-success btn-sm">upload</button>
                </div>

               

            </div>

            

            <div className="p-content">
                <strong>First Name:</strong><span>{sessionStorage["firstName"]}</span>
                {/* <strong>First Name:</strong><span>{items && items.firstName}</span> */}
            </div>
            <div className="p-content">
                <strong>Last Name:</strong><span>{sessionStorage["lastName"]}</span>
            </div>
            <div className="p-content">
                <strong>Email:</strong><span>{sessionStorage["email"]}</span>
            </div>
           
        </div>

        <Link to={"/dashboard"}> <button type="button" className="btn btn-danger">back</button></Link>

    </div>
}

export default Profile