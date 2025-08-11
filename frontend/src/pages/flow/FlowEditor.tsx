import Step from "@/components/FlowEditor/Step";
import { useGetFlowQuery } from "@/features/workflows/api/getFlowApiSlice";
import { useParams } from "react-router-dom";

const FlowEditor = () => {
    const { flowId } = useParams<string>();
    const { data } = useGetFlowQuery(flowId!, {
        skip: !flowId,
    });

    console.log("data", data);

    return (
        <div>
            <Step />
        </div>
    );
};

export default FlowEditor;
