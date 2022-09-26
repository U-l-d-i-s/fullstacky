import AuthenticatedOnly from "@/components/AuthenticatedOnly/AuthenticatedOnly";
import Layout from "@/components/Layout/Layout";
import PersonalSettings from "@/views/after-login/Personal-settings/PersonalSettings";

const index = () => {
    return(
        <Layout>
            <AuthenticatedOnly>
                <PersonalSettings />
            </AuthenticatedOnly>
        </Layout>
    );
}

export default index;
