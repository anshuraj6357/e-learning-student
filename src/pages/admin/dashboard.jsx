import React from 'react'

import { Users, ShoppingCart, DollarSign, BookOpen } from "lucide-react";
import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card";

export function Dashboard() {
    console.log("hii")
    return (
        <div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader className="flex items-center gap-2">
                        <ShoppingCart className="text-blue-500" />
                        <CardTitle>Total Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">1,250</p>
                    </CardContent>
                </Card>
                <Card className="shadow-lg rounded-2xl">
                    <CardHeader className="flex items-center gap-2">
                        <DollarSign className="text-green-500" />
                        <CardTitle>Total Revenue</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-2xl font-bold">₹ 4,50,000</p>
                    </CardContent>
                </Card>
            </div>

        </div>
    )
}