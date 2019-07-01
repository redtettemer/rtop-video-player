// GTM stuff

export function checkTaging(tag) {
    if (typeof(dataLayer) !== undefined) {
      	for (let i in dataLayer) {
            if (dataLayer[i].event === tag) {
                return true
            }
        }
        return false;
    }
    return true;
};

export function sendTag(type, tag) {
	dataLayer.push({ type: tag });
};
