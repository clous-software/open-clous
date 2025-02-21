"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/inputNormal";

const PermissionsSettings = () => {

    return (
        <main className="h-full overflow-auto w-full">
            
<nav className="flex border-b pb-2 justify-between items-center">
        <h2 className="text-xl font-semibold text-muted">
        Permissions
        </h2>
        <Button>
          Save
        </Button>
      </nav>
            {/* Permissions List */}
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <label className="flex items-center">
                    <Input type="checkbox" className="h-4 w-4 mr-2"/>
                        View Members
                    </label>
                    <label className="flex items-center">
                    <Input type="checkbox" className="h-4 w-4 mr-2"/>
                        Edit Members
                    </label>
                    <label className="flex items-center">
                    <Input type="checkbox" className="h-4 w-4 mr-2"/>
                        Delete Members
                    </label>
                    <label className="flex items-center">
                    <Input type="checkbox" className="h-4 w-4 mr-2"/>
                        View Projects
                    </label>
                    <label className="flex items-center">
                    <Input type="checkbox" className="h-4 w-4 mr-2"/>
                        Edit Projects
                    </label>
                    <label className="flex items-center">
                        <Input type="checkbox" className="h-4 w-4 mr-2"/>
                        Delete Projects
                    </label>

                    <label className="flex items-center">
                        <Input type="checkbox" className="h-4 w-4 mr-2"/>
                        API Access
                    </label>
                    <label className="flex items-center">
                        <Input type="checkbox" className="h-4 w-4 mr-2"/>
                        Receive Notifications
                    </label>
                </div>

        </main>
    );
}

export default PermissionsSettings;
