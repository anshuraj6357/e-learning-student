import React from 'react'
import { Button } from '@/components/ui/button'
import { useCreateCheckOutSessionMutation } from '@/features/api/purchaseapi'
import { useEffect } from 'react'

import { Loader2 } from "lucide-react";
export function BuyCourseButton({ courseId }) {
    const isLoading = false;
    const [CreateCheckOutSession, { data, isSuccess }] = useCreateCheckOutSessionMutation();
    const purchasecourseinitiate = async () => {
        await CreateCheckOutSession(courseId)
        console.log(data);
    }

    useEffect(() => {
        console.log(data)
        if (isSuccess) {
            if (data?.url) {
                window.location.href = data.url
            }
        }
    }, [isSuccess])
    return (
        <div>
            <Button onClick={purchasecourseinitiate}>
                {
                    isLoading ? (
                        <>
                            <Loader2 />
                        </>
                    ) : "purchase course"
                }
            </Button>
        </div>
    )
}