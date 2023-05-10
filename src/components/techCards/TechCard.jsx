import plus from "../../assets/icons/common/plus.png";
import {getClickableLink} from "../../utils/common";
import {Tooltip} from "flowbite-react";
import placeholder from "../../assets/icons/common/introtouch-Icon.svg";
import {addClickEvent} from "../../services/analytics";
import React from 'react';


const TechCard = ({
                      userId,
                      data,
                      edit: editable,
                      onClickAddService,
                      onClickEditService,
                  }) => {

    const sorted = [];
    const sortLinks = ["Call", "Message", "Mail", "Maps", "Calendly"];

    if (data.category === "GET_IN_TOUCH") {
        for (const sortLink of sortLinks) {
            for (const service of data.services) {
                if (service.name !== sortLink) continue;

                sorted.push(service);
                break;
            }
        }
        const customLinks = data.services.filter((service) => !sortLinks.includes(service.name));
        sorted.push(...customLinks);
    } else {
        sorted.push(...data.services);
    }

    const redir = () => {
        window.location.href = `${window.location.pathname}?noan=true`
    }

    const openInNewTab = (url, isNewTab = false) => {
        if (isNewTab) {
            const newWindow = window.open(url, "_blank", "noopener,noreferrer");
            if (newWindow) newWindow.opener = null;
            window.location.href = `${window.location.pathname}?noan=true`
        } else {
            window.open(url, "_self");
            setTimeout(redir, 100)
        }
    };
    return (
        <div id="techCard">
            <div className="flex justify-between items-center">
                <div className="ml-5 bg-brand-light-gray rounded-t-[5px] w-fit px-5 py-1 text-[12px]">
                    {data.title}
                </div>
                {editable && (
                    <div
                        className="flex gap-1 items-center cursor-pointer"
                        onClick={() => onClickAddService(data.category)}
                    >
                        <span className="text-[12px] font-medium">Add</span>
                        <img src={plus} alt="" className="h-[15px]"/>
                    </div>
                )}
            </div>
            <div className="border rounded-[8px] shadow grid gap-4 grid-cols-5 p-4">
                {sorted?.map((service, i) => (
                    <Tooltip placement="top" content={service.name} trigger="hover" key={i}>
                        <div
                            key={i}
                            className={`flex cursor-pointer items-center content-center bg-white rounded-[10px] overflow-hidden justify-center drop-shadow-md`}
                            onClick={() => {
                                if (editable) {
                                    onClickEditService(service);
                                } else {
                                    if (!service.navigationType) return;
                                    addClickEvent({userId, serviceId: service.serviceId})

                                    switch (service.navigationType) {
                                        case "MAIL":
                                            openInNewTab(`mailto:${service.value}`);
                                            break;
                                        case "CALL":
                                            openInNewTab(`tel:${service.value}`);
                                            break;
                                        case "SMS":
                                            openInNewTab(`sms:${service.value}`);
                                            break;
                                        case "WHATSAPP":
                                            openInNewTab(`https://wa.me/${parseInt(service.value)}`);
                                            break;
                                        default:
                                            openInNewTab(getClickableLink(service.value), true);
                                            break;
                                    }


                                }
                            }}
                        >
                            {service.icon ? (
                                <img
                                    src={service.icon}
                                    key={i}
                                    className="h-[44px] w-[44px] object-cover"
                                />
                            ) : (
                                <img
                                    src={placeholder}
                                    key={i}
                                    className="h-[44px] w-[44px] object-cover"
                                />
                            )}
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    );
};

export default TechCard;
