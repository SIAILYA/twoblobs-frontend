import {Banner, Button} from "@vkontakte/vkui";
import React from "react";


const BannerBlock = (props) => {
    const backgroundStyle = {
        backgroundColor: props.color || 'var(--accent)',
        backgroundImage: props.image ? `url(${props.image})` : null,
        backgroundPosition: 'right bottom',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    }

    return (
        <Banner
            asideMode={props.dismiss ? "dismiss" : null}
            onDismiss={props.dismiss}
            mode={props.mode || "image"}
            size={props.size || "s"}
            className={props.class || "banner_other"}
            header={<span>{props.header}</span>}
            subheader={props.subheader || ""}
            style={props.otherStyles}
            background={
                <div
                    className={props.back_class || "banner_bg_default"}
                    style={backgroundStyle}
                />
            }
            actions={<Button mode="overlay_primary" size="m" onClick={() => {props.action()}}>{props.button}</Button>}
        >
        </Banner>
    )
};


export default BannerBlock;