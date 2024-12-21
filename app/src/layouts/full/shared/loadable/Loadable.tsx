import Spinner from "@ui/view/spinner/Spinner";
import {Suspense} from "react";

// project imports

// ===========================|| LOADABLE - LAZY LOADING ||=========================== //

const Loadable = (Component: any) => (props: any) =>
    (
        <Suspense fallback={<Spinner/>}>
          <Component {...props} />
        </Suspense>
    );

export default Loadable;
