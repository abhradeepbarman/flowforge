import Step from "@/components/FlowEditor/Step";
import { useGetFlowQuery } from "@/features/workflows/api/getFlowApiSlice";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FlowEditor = () => {
    const { flowId } = useParams<string>();
    const [currIndex, setCurrIndex] = useState(0);

    const { data } = useGetFlowQuery(flowId!, {
        skip: !flowId,
    });

    useEffect(() => {
        if (data?.data?.steps) {
            const lastIndex = data.data.steps.length - 1;
            setCurrIndex(lastIndex + 1);
        } else {
            setCurrIndex(0);
        }
    }, [data]);

    console.log("data", data);

    return (
        <div>
            <p className='text-2xl'>{data?.data.name}</p>

            <div>
                <Step />
            </div>
        </div>
    );
};

export default FlowEditor;
