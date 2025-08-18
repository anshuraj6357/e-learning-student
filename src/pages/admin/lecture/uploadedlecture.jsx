import React from 'react';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Switch } from "@/components/ui/Switch";

export function Lectures({ lecture, courseId, index }) {
    const navigate = useNavigate();

    const gotoUpload = (e) => {
        e.preventDefault();
        navigate(`/admin/course/${courseId}/lecture/${lecture._id}`);
    };

    return (
        <div className="flex items-center justify-between p-4 mb-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-300">
            <h1 className="text-lg font-semibold text-gray-800">
                Lecture {index + 1}: {lecture.lectureTitle}
            </h1>
            <button
                onClick={gotoUpload}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200"
                title="Edit Lecture"
            >
                <Edit size={20} />
            </button>
        </div>
    );
}
