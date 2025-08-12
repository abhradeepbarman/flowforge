import LogoutBtn from "@/components/common/LogoutBtn";
import { Button } from "@/components/ui/button";
import { useCreateFlowMutation } from "@/features/workflows/api/createFlowApiSlice";
import { useGetAllFlowsQuery } from "@/features/workflows/api/getAllFlowsApiSlice";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Flows = () => {
    const [createFlow] = useCreateFlowMutation();
    const navigate = useNavigate();
    const { data } = useGetAllFlowsQuery();

    const handleCreateFlow = async () => {
        try {
            const response = await createFlow().unwrap();
            navigate(`/flows/editor/${response.data.id}`);
        } catch (error) {
            console.error("Error creating flow:", error);
            toast.error("Error creating flow");
        }
    };

    console.log("data", data);

    return (
        <div>
            <div className='flex gap-x-5'>
                <LogoutBtn />

                <Button onClick={handleCreateFlow} className='cursor-pointer'>
                    <Plus /> Create flow
                </Button>
            </div>

            <div>
                {data?.data &&
                    data.data.map((flow) => (
                        <div
                            key={flow.id}
                            onClick={() => navigate(`/flows/editor/${flow.id}`)}
                        >
                            <div>{flow.name}</div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Flows;
