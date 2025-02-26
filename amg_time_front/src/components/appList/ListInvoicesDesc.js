import { Table } from "reactstrap";
import { Text } from "@consta/uikit/Text"
import AppModalInvoicesDesc from "../appModal/ModalInvoicesDesc";
import AppRemoveInvoicesDesc from "../appRemove/RemoveInvoicesDesc";

const AppListInvoicesDesc = (props) => {

    const textStyleHeader = (text) => {
        return <Text view="secondary" font="mono" transform="uppercase" weight="light" truncate> {text} </Text>
    }

    return (
        <Table hover className="fixed-header">
            <thead>
                <tr>
                    <th>{textStyleHeader("N п/п")}</th>
                    <th>{textStyleHeader("Описание")}</th>
                    <th>{textStyleHeader("Кол-во")}</th>
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
                ) : props.data.filter(d => d.invoice_id == props.inv_pk)
                    .map(item => (
                        <tr key={item.pk}>
                            <td>
                                <Text font="mono">{item.row_num}</Text>
                            </td>
                            <td>
                                <Text>{item.description}</Text>
                            </td>
                            <td>
                                <Text>{item.quantity}</Text>
                            </td>
                            <td>
                                <AppModalInvoicesDesc
                                    create={false}
                                    item={item}
                                    resetState={props.resetState}
                                    newItem={props.newItem}
                                    inv_pk={props.inv_pk}
                                    setDescSet={props.setDescSet}
                                />
                                &nbsp;&nbsp;
                                <AppRemoveInvoicesDesc
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

export default AppListInvoicesDesc