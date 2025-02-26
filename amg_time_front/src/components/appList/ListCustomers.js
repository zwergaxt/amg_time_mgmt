import { Table } from "reactstrap";
import { Text } from "@consta/uikit/Text"
import AppModalCustomers from "../appModal/ModalCustomers";
import AppRemoveCustomers from "../appRemove/RemoveCustomers";

const AppListCustomers = (props) => {

    const textStyleHeader = (text) => {
        return <Text view="secondary" font="mono" transform="uppercase" weight="light" truncate> {text} </Text>
    }

    return (
        <Table hover className="fixed-header">
            <thead>
                <tr>
                    <th>{textStyleHeader("Наименование")}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {!props.data || props.data.length <= 0 ? (
                    <tr>
                        <td colSpan="5" align="center">
                            <b>Пока ничего нет</b>
                        </td>
                    </tr>
                ) : props.data.map(item => (
                    <tr key={item.pk}>
                        <td>
                            {item.title}
                        </td>
                        <td>
                            <AppModalCustomers
                                create={false}
                                item={item}
                                resetState={props.resetState}
                                newItem={props.newItem}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveCustomers
                                pk={item.pk}
                                resetState={props.resetState}
                            />
                        </td>
                    </tr>
                )
                )}
            </tbody>
        </Table>
    )
}

export default AppListCustomers;