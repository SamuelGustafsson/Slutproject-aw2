import React from 'react'; 

 const Preloader = () => {
    return (
        <div className="row">
            <div className="center-align">
                <div className="preloader-wrapper active center-align">
                    <div className="spinner-layer spinner-red-only">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Preloader;