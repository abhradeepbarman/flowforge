import CreateTrigger from "@/components/FlowEditor/CreateTrigger";
import { useGetFlowQuery } from "@/features/workflows/api/getFlowApiSlice";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FlowEditor = () => {
    const { flowId } = useParams<string>();
    const [triggerData, setTriggerData] = useState(undefined);
    const [actionsData, setActionsData] = useState([]);

    const { data } = useGetFlowQuery(flowId!, {
        skip: !flowId,
    });

    console.log("data", data);

    return (
        <div>
            <p className='text-2xl'>{data?.data.name}</p>

            <div>
                <h2>Trigger</h2>
                <div>
                    {!triggerData ? <CreateTrigger flowId={flowId!} /> : <></>}
                </div>
            </div>
        </div>
    );
};

export default FlowEditor;
