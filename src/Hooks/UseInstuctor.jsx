import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";


const UseInstructor = () => {
    const { user } = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()



    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ['isInstructor', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/instuctor/${user?.email}`);
            return res.data.instuctor;
        }
    })
    return [isInstructor, isInstructorLoading]
}
export default UseInstructor;
