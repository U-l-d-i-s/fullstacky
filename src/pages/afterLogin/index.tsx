import AuthenticatedOnly from "@/components/AuthenticatedOnly/AuthenticatedOnly";
import Layout from "@/components/Layout/Layout";
import AfterLogin from "@/views/after-login/AfterLogin";

const index = () => {

    return(
        <Layout>
            <AuthenticatedOnly>
                <AfterLogin />
            </AuthenticatedOnly>
        </Layout>
    );
};

export default index;