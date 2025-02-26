import { Fragment, useState } from "react";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconAdd } from "@consta/icons/IconAdd";
import { Button } from "@consta/uikit/Button";
import { Modal } from "@consta/uikit/Modal";
import { Text } from "@consta/uikit/Text";
import { Card } from "@consta/uikit/Card";
import { cnMixSpace } from '@consta/uikit/MixSpace';
import AppFormInvoices from "../appForm/FormInvoices";

const AppModalInvoices = (props) => {
    const [visible, setVisible] = useState(false)

    var button = <Button onClick={() => { toggle() }} iconRight={IconEdit} view="secondary" size="s"></Button>;

    const toggle = () => {
        setVisible(!visible)
    }

    if (props.create) {
        button = (
            <Button
                onClick={() => toggle()}
                label={"Добавить накладную"}
                iconLeft={IconAdd}
                size="s"
                view="ghost">
            </Button>
        )
    }

    return (
        <Fragment>
            {button}
            <Modal isOpen={visible} toggle={toggle} position="center" style={{ "width": "150em" }}>
                <Card
                    verticalSpace="xl"
                    horizontalSpace="4xl">
                    <Text
                        align="center"
                        view="primary"
                        size="xl"
                        transform="uppercase"
                        className={cnMixSpace({
                            m: "s"
                        })}>
                        {props.create ? "Добавить накладную" : "Редактировать накладную"}
                    </Text>
                    <AppFormInvoices
                        item={props.item ? props.item : []}
                        resetState={props.resetState}
                        toggle={toggle}
                        newItem={props.newItem}
                    />
                </Card>
            </Modal>
        </Fragment>
    )
}
export default AppModalInvoices;