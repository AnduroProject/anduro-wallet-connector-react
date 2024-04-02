import React from 'react';
export const ConnectorVW = (props: any) => {
    const {title, buttonName, handleClickAction} = props;
    return (
        <div>
            <div className="widset_parent">
                <div className='addpadding'>
                    <h3 className='title'>{title}</h3>
                    <button className='btnsubmit' onClick={handleClickAction} >{buttonName}</button>
                </div>
            </div>
        </div>
    );
}
