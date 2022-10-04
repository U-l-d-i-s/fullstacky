import AuthenticatedOnly from "@/components/AuthenticatedOnly/AuthenticatedOnly";
import Layout from "@/components/Layout/Layout";
import NewWorkoutView from "@/views/after-login/NewWorkout/NewWorkoutView";

const index = ()=> {
    
    return(
        <Layout>
            <AuthenticatedOnly>
                <NewWorkoutView />
            </AuthenticatedOnly>
        </Layout>
    );
};

export default index;