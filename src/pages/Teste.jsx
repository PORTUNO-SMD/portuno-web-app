import dynamic from "next/dynamic";

const Schedule = dynamic(() => import("../components/schedule"), { ssr: false });

const Teste = () => {
    return <Schedule />;
};

export default Teste;
