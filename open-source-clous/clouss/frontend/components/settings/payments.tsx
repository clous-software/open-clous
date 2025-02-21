import { Button } from '@/components/ui/button';
import React from 'react';

const BillingSettings = () => {
    return (
        <main className="h-full overflow-auto w-full">

<nav className="flex border-b pb-3.5 justify-between items-center pt-1.5">
        <h2 className="text-xl font-semibold text-muted">
          Suscriptions
        </h2>
      </nav>
                <div className='flex flex-col gap-y-4 pt-4 '>
                <div className="border p-4 rounded-lg flex justify-between items-center">
                    <p>You have no pending invoices.</p>
                    <Button className="bg-primary text-background ">View All Invoices</Button>
                </div>
                </div>

            {/* Suscripciones */}


                <div className='flex flex-col gap-y-4 pt-4 '>
                <div className="border p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <p>Current plan: Starter</p>
                        <p>Renewal date: August 25, 2023</p>
                    </div>
                    <Button className="bg-primary text-background ">Change Plan</Button>
                </div>
                </div>

                <div className='flex flex-col gap-y-4 pt-4'>
                <div className="border p-4 rounded-lg">
                    <p>Last payment: July 25, 2023 - $470</p>
                    <Button className="bg-primary text-background mt-4">View Payment Details</Button>
                </div>
                </div>
        </main>
    );
}

export default BillingSettings;
