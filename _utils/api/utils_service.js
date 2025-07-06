
import { requestBuilder, utilsApi } from "./base.js"


const hash = (plain, onSuccess, onFailure = {}) => {

    requestBuilder(
        utilsApi('/hash'),
        'POST',
        {
            plain
        },
        onSuccess,
        onFailure
    )

}



export {
    hash,
}
