import AuthenticatedOnly from "@/components/AuthenticatedOnly/AuthenticatedOnly";
import Layout from "@/components/Layout/Layout";

const index = () => {
    return (
        <Layout>
            <AuthenticatedOnly>
                <div>
                    <p>Our e-commerce Shop</p>
                </div>
            </AuthenticatedOnly>
        </Layout>

    );
}

export default index;