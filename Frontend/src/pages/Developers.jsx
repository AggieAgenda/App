import Navbar from "../components/Navbar"

export default function Developers() {
    return(
        <div className="">
            <Navbar></Navbar>
            <br></br>
            <img url = "https://drive.google.com/file/d/1IDDLS8vD_UdQ1pLU7edYJCNYiZ-BzWng/preview"></img>
            <div className="flex justify-center item-center">
                <div className="text-center">
                    <iframe src="https://drive.google.com/file/d/1IDDLS8vD_UdQ1pLU7edYJCNYiZ-BzWng/preview" width="320" height="240" allow="autoplay"></iframe>
                    <p>Dev Team</p>
                </div>
            </div>
            <br></br>
            <section> {/*Project Managers */}
                <div className = "flex justify-center px-5">
                    <br></br>
                    <div className="flex space-x-10">
                        <div>
                            {/*Add Image*/}
                            <p>Aniekan ..</p>
                        </div>
                        <div>
                            <p>Dunsin Komolafe</p>
                            <a href = "https://Linkedin.com/in/Dunsink">
                                <p>LinkedIn</p>
                                <img url = "https://img.freepik.com/premium-vector/linkedin-icon-illustration-linkedin-app-logo-social-media-icon_561158-3644.jpg"></img>
                            </a>
                        </div>
                        
                    </div>
                    

                </div> 
                <br></br> 
                <div className="flex justify-center"> {/* Just Text*/}
                    <p>Project Managers</p> 
                </div>
            </section>
            <section>
                {/*Put images of everyon */}
            </section>
            
        </div>
    );
}