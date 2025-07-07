
import { postRequestBuilder, utilsApi } from "./base.js"


const hash = (plain, onSuccess, onFailure = {}) => {

    postRequestBuilder(
        utilsApi('/hash'),
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
