import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function SectionTable() {

  return (
    <div className="grid grid-flow-row border border-1 rounded-2xl mx-auto text-dark-blue-greenish py-12 mx-24 mb-16 px-12">
      <div className="grid grid-flow-col justify-end text-3xl font-semibold text-center">
        <div className="w-40">
          <h1 className="mb-6 text-2xl">Starter</h1>
          <Link
            to="https://beta.clous.app" target="_blank"
              className="mt-4 my-2 rounded-lg text-center text-lg font-semibold py-2.5 px-3.5 bg-button-orange text-secondary hover:bg-orange-700
       hover:text-gray-50 "
            >
              Try Clous
            </Link>
          
        </div>
        <div className="w-40">
          <h1 className="mb-6 text-2xl">Team</h1>
          <Link
            to="https://buy.stripe.com/3cs9Cl8JcfQT79m4go" target="_blank"
              className="mt-4 my-2 rounded-lg text-center text-lg font-semibold py-2.5 px-3.5 bg-button-orange text-secondary hover:bg-orange-700
       hover:text-gray-50 "
            >
              Try Clous
            </Link>
          
        </div>
        <div className="w-40">
          <h1 className="mb-6 text-2xl">Business</h1>
          <Link
            to="https://www.clous.app/contact" target="_blank"
              className="mt-4 my-2 rounded-lg text-center text-lg font-semibold py-2.5 px-3.5 bg-button-orange text-secondary hover:bg-orange-700
       hover:text-gray-50 "
            >
              Contact us
            </Link>
          
        </div>
        <div className="w-40">
          <h1 className="mb-6 text-2xl">Enterprise</h1>
          <Link
            to="/contact"
              className="mt-4 my-2 rounded-lg text-center text-lg font-semibold py-2.5 px-3.5 bg-button-orange text-secondary hover:bg-orange-700
       hover:text-gray-50 "
            >
              Contact us
            </Link>
          
        </div>
      </div>
      <div className="">
        <h2 className="text-2xl font-semibold mt-6">
          Usage
        </h2>
        <div className="my-4 text-lg font-medium">
          <div className=" flex flex-row justify-between">
            <p>Job openings</p>
            <div className="grid grid-flow-col text-center">
              <p className="w-40">
                1 free
              </p>{" "}
              <p className="w-40">
                Unlimited
              </p>{" "}
              <p className="w-40">
                Unlimited
              </p>{" "}
              <p className="w-40">
              {" "}
              Unlimited             
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium ">
          <div className="flex flex-row justify-between ">
            <p>AI events</p>
            <div className="grid grid-flow-col text-center justify-end">
              <p className="w-40">
                
                {" "}
                Limited
              </p>{" "}
              <p className="w-40">
                {" "}
                <Check className="w-6 h-6 mx-auto" />
              </p>{" "}
              <p className="w-40">
                {" "}
                <Check className="w-6 h-6 mx-auto" />
              </p>{" "}
              <p className="w-40">
                {" "}
                Unlimited
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between ">
            <p>Hiring analytics</p>
            <div className="grid grid-flow-col text-center justify-end">
            <p className="w-40">
                Limited
              </p>{" "}
              <p className="w-40">
                {" "}
                <Check className="w-6 h-6 mx-auto" />
              </p>{" "}
              <p className="w-40">
                {" "}
                <Check className="w-6 h-6 mx-auto" />
              </p>{" "}
              <p className="w-40">
                {" "}
                <Check className="w-6 h-6 mx-auto" />
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between ">
            <p>Data history</p>
            <div className="grid grid-flow-col justify-end text-center">
              
              <p className="w-40">
                30 days
              </p>{" "}
              <p className="w-40">
                90 days
              </p>{" "}
              <p className="w-40">
                Unlimited
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        
       
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between ">
            <p>Custom pricing</p>
            <div className="grid grid-flow-col justify-end">
            
              <p className="w-40">
                {" "}
                <Check className="w-6 h-6 mx-auto" />              </p>{" "}
            </div>{" "}
          </div>
        </div>
      </div>
      <div className=" mt-6">
        <h2 className="text-2xl font-semibold mt-6">
          Sharing collaboration
        </h2>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Team members</p>
            <div className="grid grid-flow-col text-center justify-end">
              <p className="w-40">
                8 members
              </p>{" "}
              <p className="w-40">
                Unlimited
              </p>{" "}
              <p className="w-40">
                Unlimited
              </p>{" "}
              <p className="w-40">
                Unlimited
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Collaborative recruiting</p>
            <div className="grid grid-flow-col justify-end">
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Guest collaborators</p>
            <div className="grid grid-flow-col text-center justify-end">
              <p className="w-40">
                No
              </p>{" "}
              <p className="w-40">
                10
              </p>{" "}
              <p className="w-40">
                100
              </p>{" "}
              <p className="w-40">
                Unlimited
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Permission groups</p>
            <div className="grid grid-flow-col justify-end">
            <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>

      </div>  
      <div className=" mt-6">
        <h2 className="text-2xl font-semibold mt-6">
          Customer success
        </h2>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Community membership</p>
            <div className="grid grid-flow-col justify-end">
            <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Dedicated Solutions Engineer</p>
            <div className="grid grid-flow-col justify-end">
           
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>24/7 email support</p>
            <div className="grid grid-flow-col justify-end">
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>24/7 chat support</p>
            <div className="grid grid-flow-col justify-end">
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between ">
            <p>Success monitoring dashboard</p>
            <div className="grid grid-flow-col justify-end">
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mt-6">Data and integrations</h2>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between ">
            <p>Connections to applications</p>
            <div className="grid grid-flow-col text-center justify-end">
            <p className="w-40">
              5 connections 
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Connections monitoring</p>
            <div className="grid grid-flow-col justify-end">
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Data imports</p>
            <div className="grid grid-flow-col justify-end">
            <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Data exports</p>
            <div className="grid grid-flow-col text-center justify-end">
            
              <p className="w-40">
              1 export 
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mt-6">
          Manage your workspace
        </h2>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="flex flex-row justify-between  ">
            <p>Custom filtering</p>
            <div className="grid grid-flow-col justify-end">
            <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        
       
        
        
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mt-6">
          Security and compliance
        </h2>
        
      
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="grid grid-flow-col ">
            <p>Data anomaly detection</p>
            <div className="grid grid-flow-col justify-end">
            <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="grid grid-flow-col ">
            <p>Compliance automation</p>
            <div className="grid grid-flow-col justify-end">
            
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="grid grid-flow-col ">
            <p>SAML SSO</p>
            <div className="grid grid-flow-col justify-end">
            <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="grid grid-flow-col ">
            <p>Audit logs</p>
            <div className="grid grid-flow-col justify-end">
           
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="my-4 text-lg font-medium   items-center ">
          <div className="grid grid-flow-col ">
            <p>Advanced security</p>
            <div className="grid grid-flow-col justify-end">
            
              <p className="w-40">
              {" "}
                <Check className="w-6 h-6 mx-auto" />   
              </p>{" "}
            </div>{" "}
          </div>
        </div>
        
      </div>
    </div>
  );
}
