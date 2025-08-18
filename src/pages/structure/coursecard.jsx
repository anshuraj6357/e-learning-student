import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

export function CourseCard({ courseId, image, name, price, authorname,coursename, level }) {
    const navigate = useNavigate();

    const changepagehandler = (e) => {
        e.preventDefault();
        navigate(`/course-details/${courseId}`);
    };

    return (
        <Card className="flex flex-col w-[300px] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer" onClick={changepagehandler}>
            <CardHeader className="p-0">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover rounded-t-lg"
                />
            </CardHeader>

            <CardContent className="p-4 flex flex-col gap-2">
                <CardTitle className="text-lg font-semibold text-gray-900 truncate">{coursename}</CardTitle>

                {/* Author + Level */}
                <div className="flex  justify-between mt-2 mb-2">
                    <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="https://github.com/shadcn.png" alt={authorname} />
                        </Avatar>
                        <p className="text-gray-700 font-medium text-sm truncate">{name}</p>
                    </div>
                    <Badge className="text-sm">{level}</Badge>
                </div>
                <p className="text-blue-600 font-bold text-lg">${price}</p>
            </CardContent>

            <CardFooter>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                    Buy Now
                </Button>
            </CardFooter>
        </Card>
    );
}





