
import { deleteRequestBuilder, getRequestBuilder, talesApi } from "./base.js"


/**
 * Tale
 */

const getTaleById = (id, onSuccess, onFailure = {}) =>
    getRequestBuilder(
        talesApi('/', id),
        onSuccess,
        onFailure
    )


const deleteTaleById = (id, onSuccess, onFailure = []) =>
    deleteRequestBuilder(
        talesApi('/', id),
        onSuccess,
        onFailure
    )


/**
 * Author
 */

const getAuthorTales = (onSuccess, onFailure = {}) =>
    getRequestBuilder(
        talesApi('/author/'),
        onSuccess,
        onFailure
    )


const deleteAuthorTales = (onSuccess, onFailure = {}) =>
    deleteRequestBuilder(
        talesApi('/author/'),
        onSuccess,
        onFailure
    )


/**
* export
*/

export {
    getTaleById,
    deleteTaleById,
    getAuthorTales,
    deleteAuthorTales,
}
