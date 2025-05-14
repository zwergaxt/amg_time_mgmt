import HomeProjects from "../appHome/HomeProjects";
import HomeCustomers from "../appHome/HomeCustomers";
import HomeContractors from '../appHome/HomeContractors';
import HomeReports from "../appHome/HomeReports"
import HomeActs from "../appHome/HomeActs";
import HomeInvoices from "../appHome/HomeInvoices";
import { Informer } from "@consta/uikit/Informer";
import HomeAgreements from "../appHome/HomeAgreements";
import HomeActsContr from "../appHome/HomeActsContr";

const Navigation = ({nav}) => {
    if (nav === 0) {
        return <Informer
                        status="system"
                        view="outline"
                        title="Инфо"
                        label="Выберите раздел" />
    } else if (nav === 1) {
        return <HomeProjects/>
    } else if (nav === 2) {
        return <HomeCustomers />
    } else if (nav === 3) {
        return <HomeContractors />
    } else if (nav === 4) {
        return <HomeActs />
    } else if (nav === 5) {
        return <HomeInvoices />
    } else if (nav === 6) {
        return <HomeReports />
    } else if (nav === 7) {
        return <HomeAgreements />
    } else if (nav === 8) {
        return <HomeActsContr />
    }
}
export default Navigation;