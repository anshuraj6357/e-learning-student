import React from 'react'


import {
    Card,
    CardHeader,
    CardTitle,

    CardContent,

} from "@/components/ui/card";

export function Showlecture({ title, videourl }) {
    return (
        <div>
            <Card className="mb-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-gray-900"><p>{title}</p></CardTitle>
                </CardHeader>
                <CardContent>
                    {videourl ? (
                        <video
                            src={videourl}
                            controls
                            className="w-full h-auto rounded-md border border-gray-300 shadow-sm"
                        >
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <p className="text-gray-500">Video not available</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}