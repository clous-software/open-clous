"use client";

import {PreferencesForm} from "../form/PreferencesForm";
import { Button } from "../ui/button";


const Preferences = () => {


  return (
    <main
      className="h-full overflow-auto w-full">
        <nav className="flex border-b pb-2 justify-between items-center ">
        <h2 className="text-xl font-semibold text-muted">
         Job Preferences
        </h2>
      
      </nav>
        <PreferencesForm/>
    </main>
  );
};

export default Preferences;




