import { Table } from "reactstrap";
import { Text } from "@consta/uikit/Text"
import AppModalAgreements from "../appModal/ModalAgreements";
import AppRemoveAgreements from "../appRemove/RemoveAgreements";

const AppListAgreements = (props) => {

    const textStyleHeader = (text) => {
        return <Text view="secondary" font="mono" transform="uppercase" weight="light" truncate> {text} </Text>
    }

    return (
        <Table hover className="fixed-header">
            <thead>
                <tr>
                    <th>{textStyleHeader("Номер")}</th>
                    <th>{textStyleHeader("Договор")}</th>
                    <th>{textStyleHeader("Сумма")}</th>
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
                            <Text font="mono">{item.agr_number}</Text>
                        </td>
                        <td>
                            <Text>{item.project.prj_number}</Text>
                        </td>
                        <td>
                            <Text>{item.price}</Text>
                        </td>
                        <td>
                            <AppModalAgreements
                                create={false}
                                item={item}
                                resetState={props.resetState}
                                newItem={props.newItem}
                            />
                            &nbsp;&nbsp;
                            <AppRemoveAgreements
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

export default AppListAgreements