import { Fragment, useState } from "react";
import { IconEdit } from "@consta/icons/IconEdit";
import { IconAdd } from "@consta/icons/IconAdd";
import { Button } from "@consta/uikit/Button";
import { Modal } from "@consta/uikit/Modal";
import { Text } from "@consta/uikit/Text";
import { Card } from "@consta/uikit/Card";
import { cnMixSpace } from '@consta/uikit/MixSpace';
import AppFormInvoicesDesc from "../appForm/FormInvoicesDesc";

const AppModalInvoicesDesc = (props) => {
    const [visible, setVisible] = useState(false)

    // const [visible, setVisible] = useState(false)
    var button = <Button onClick={() => { toggleDesc() }} iconRight={IconEdit} view="secondary" size="s"></Button>;

    const toggleDesc = () => {
        setVisible(!visible)
    }

    if (props.create) {
        button = (
            <Button
                onClick={() => toggleDesc()}
                label={"Добавить документ"}
                iconLeft={IconAdd}
                size="s"
                view="ghost">
            </Button>
        )
    }

    return (
        <Fragment>
            {button}
            <Modal isOpen={visible} toggleDesc={toggleDesc} position="center" style={{ "width": "150em" }}>
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
                        {props.create ? "Добавить документ" : "Редактировать документ"}
                    </Text>
                    <AppFormInvoicesDesc
                        item={props.item ? props.item : []}
                        resetState={props.resetState}
                        toggleDesc={toggleDesc}
                        newItem={props.newItem}
                        inv_pk={props.inv_pk}
                        setDescSet={props.setDescSet}
                    />
                </Card>
            </Modal>
        </Fragment>
    )
}
export default AppModalInvoicesDesc;