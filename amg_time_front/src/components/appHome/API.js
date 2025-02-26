import useAxios from "axios-hooks";
import {API_URL_I} from "../../index";

const API = (props) => {
    const API_URL = () => {
        switch (props.nav) {
            case 1:
                return API_URL_I + "projects/"
                break;
            case 2:
                return API_URL_I + "customers/"
                break;
        }
    }

    const [{ data, loading, error }, refetch] = useAxios(
        API_URL
      );

    const refetchData = () => {
        refetch()
    }  
    
    if (loading) return <p>loading...</p>
    return data  

} 
export default API;