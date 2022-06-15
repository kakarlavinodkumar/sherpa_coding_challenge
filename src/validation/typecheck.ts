export const typeCheckService = function (value: any, expected_type: string) {
    try {
        if(expected_type === "number") {
            if(Number(value) === NaN) {
                throw `${value} should be of type ${expected_type}`;
            } else {
                return
            }
        }
        return;
    } catch (err) {
        throw err;
    }
}