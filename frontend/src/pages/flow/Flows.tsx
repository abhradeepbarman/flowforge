import { Button } from "@/components/ui/button";
import { useCreateFlowMutation } from "@/features/workflows/api/createFlowApiSlice";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Flows = () => {
    const [createFlow] = useCreateFlowMutation();
    const navigate = useNavigate();

    const handleCreateFlow = async () => {
        try {
            const response = await createFlow().unwrap();
            navigate(`/flows/editor/${response.data.id}`);
        } catch (error) {
            console.error("Error creating flow:", error);
            toast.error("Error creating flow");
        }
    };

    return (
        <div>
            <Button onClick={handleCreateFlow} className="cursor-pointer">
                <Plus /> Create flow
            </Button>
        </div>
    );
};

export default Flows;
