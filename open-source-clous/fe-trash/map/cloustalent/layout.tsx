import React from "react";

const ServerLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    
    return ( 
        <main className="h-full w-full lg:flex lg:flex-1 ">
            {children}
        </main>
     );
}
 
export default ServerLayout;




