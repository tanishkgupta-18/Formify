import { Button } from '@/components/ui/button';
import { ChartNoAxesCombinedIcon, LibraryBig, MessageCircleMore, MessageSquare, Shield, SquarePlus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import { Progress } from "@/components/ui/progress"

function SideNav() {
    const menuList = [
        {
            id:1,
            name:'My Forms',
            icon:LibraryBig,
            path:'/dashboard',
        },
        {
            id:1,
            name:'Responses',
            icon:MessageSquare,
            path:'/dashboard/responses'
        },
        {
            id:1,
            name:'Analytics',
            icon:ChartNoAxesCombinedIcon,
            path:'/dashboard/analytics'
        },
        {
            id:1,
            name:'Upgrade',
            icon:Shield,
            path:'/dashboard/upgrade'
        }
    ]

    const path = usePathname();
    useEffect(() => {{console.log(path)}}, [path])
  return (
    <div className='h-screen shadow-md border'>
        <div>
            {menuList.map((item) => (
                <div key={item.id} className={`flex items-center gap-2 p-3 hover:bg-indigo-100 cursor-pointer ${path==item.path&&"bg-indigo-100"}`}>
                    <item.icon className='text-primary'/>
                    <span className='text-sm font-medium'>{item.name}</span>
                </div>
            ))}
        </div>
        <div className='fixed bottom-20 p-6 w-64'>
            <Button className="w-full">Create Form</Button>
            <div className='my-4'>
                <Progress value={33}></Progress>
                <h2 className='text-sm mt-2 text-gray-600'><strong>1</strong> out of <strong>3</strong> files created</h2>
                <h2 className='text-xs mt-2 text-gray-600'> Upgrade your plan for unlimited forms </h2>
            </div>
        </div>
    </div>
  )
}

export default SideNav