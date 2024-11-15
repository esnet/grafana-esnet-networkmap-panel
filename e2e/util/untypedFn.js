
export const waitForEvent = async (pageInstance, eventName, optionsOrPredicate) => {
    return pageInstance.waitForEvent(eventName, optionsOrPredicate);
};
